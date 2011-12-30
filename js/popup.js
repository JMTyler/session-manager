(function(){
"use strict";

/*** utils ***/
var utils = {
	view: function(name){
		$("body").children().hide();
		$("#" + name).show();
	},
	confirm: function(html, index){
		var yes = $("#confirm-text").html(html).siblings().last().attr("data-actionindex", typeof index === "number" ? index : 1);
		utils.view("confirm");
		yes.focus();
	},
	action: function(name, index){
		state.action = name || state.action;
		actions[state.action][index || 0](state.name);
		sessions.load();
	},
	escape: function(text){
		return $("<div/>").text(text).html();
	},
	tabs: function(cb){
		chrome.tabs.getAllInWindow(null, function(tabs){
			if (localStorage.pinned === "skip") {
				tabs = tabs.filter(function(t){ return !t.pinned; });
			}
			
			cb(tabs.map(function(t){ return t.url; }));
			sessions.load();
		});
	}
};

$(document).on("click keypress", "[data-view], [data-action]", function(e){
	if ((this.tagName === "BUTTON" && e.type === "keypress") || (this.tagName === "INPUT" && (e.type !== "keypress" || e.which !== 13))) { return; }
	
	"view" in this.dataset && utils.view(this.dataset.view);
	"action" in this.dataset && utils.action(this.dataset.action, this.dataset.actionindex);
});


/*** data ***/
var background = chrome.extension.getBackgroundPage();

var state = {
	name: "",
	action: "",
	entered: ""
};

var sessions = {
	list: JSON.parse(localStorage.sessions),
	temp: localStorage.temp ? JSON.parse(localStorage.temp) : undefined,
	
	load: function(){
		var $temp = $("#main-saved-temp"), $list = $("#main-saved-list");
		$temp.add($list).empty();
		
		if (sessions.temp) {
			localStorage.temp = JSON.stringify(sessions.temp);
			$temp.html("Temp session: " + sessions.display(null, true) + " (<span><a>Open</a> - <a>Add</a> - <a>Remove</a></span>)<hr>");
		} else {
			delete localStorage.temp;
		}
		
		localStorage.sessions = JSON.stringify(sessions.list);
		$.each(sessions.list, function(name){
			$("<div/>").html("<big>" + utils.escape(name) + "</big><br>" +
				sessions.display(name, true) +
				"<span><a>Open</a> - <a>Rename</a> - <a>Add</a> - <a>Replace</a> - <a>Remove</a></span>" +
			"<br><hr>").attr("data-name", name).appendTo($list);
		});
		
		$("hr", "#main-saved").last().remove();
		
		$list.children().css("margin-right", Object.keys(sessions.list).length >= 13 ? 5 : 0);
	},
	display: function(name, count){
		var prefix = "", session = name === null ? (name = "temp session", !count && (prefix = "the "), sessions.temp) : sessions.list[name];
		return prefix + '<a title="' + session.join("\n") + '">' + (count ? session.length + " tabs" : utils.escape(name)) + '</a>';
	}
};


/*** actions ***/
var actions = {
	"import": [function(){
		var $text = $("#import-text"), success = true;
		
		try {
			$.each(JSON.parse($text.val()), function(name, urls){
				sessions.list[name] = urls;
			});
			
			$("#import-success").slideDown(500).delay(1500).queue(function(next){ utils.view("main"); $(this).hide(); next(); });
		} catch (e) {
			$("#import-failed").slideDown(500).delay(1500).slideUp(500);
			
			success = false;
		}
		
		$text.val("");
		
		background._gaq.push(["_trackEvent", "Action", "Import", success ? "Success" : "Failure"]);
	}],
	
	"export": [function(){
		$("#export-text").val(localStorage.sessions);
	}],
	
	rename: [function(name){
		$("#rename-legend").html("Rename " + sessions.display(name));
		utils.view("rename");
		$("#rename-text").val("").focus();
	}, function(oname){
		var nname = state.entered = $("#rename-text").val().trim();
		
		if (nname) {
			if (sessions.list[nname]) {
				utils.confirm("Are you sure you want to replace " + sessions.display(nname) + " by renaming " + sessions.display(oname) + "?", 2);
			} else {
				utils.action("rename", 2);
				utils.view("main");
			}
		}
	}, function(oname){
		sessions.list[state.entered] = sessions.list[oname];
		
		if (state.entered !== oname) {
			delete sessions.list[oname];
		}
		
		background._gaq.push(["_trackEvent", "Session", "Rename"]);
	}],
	
	add: [function(name){
		utils.confirm("Are you sure you want to add the current window's tabs to " + sessions.display(name) + "?");
	}, function(name){
		utils.tabs(function(tabs){
			Array.prototype.push.apply(name === null ? sessions.temp : sessions.list[name], tabs);
		});
		
		background._gaq.push(["_trackEvent", name === null ? "Temp": "Session", "Add"]);
	}],
	
	replace: [function(name){
		utils.confirm("Are you sure you want to replace " + sessions.display(name) + " with the current window's tabs?");
	}, function(name){
		background._gaq.push(["_trackEvent", "Session", sessions.list[name] ? "Replace" : "Save"]);
		
		utils.tabs(function(tabs){
			sessions.list[name] = tabs;
		});
	}, function(name){
		utils.confirm("Are you sure you want to replace " + sessions.display(name) + " with the session being saved?");
	}],
	
	remove: [function(name){
		utils.confirm("Are you sure you want to remove " + sessions.display(name) + "?");
	}, function(name){
		if (name === null) {
			delete sessions.temp;
		} else {
			delete sessions.list[name];
		}
		
		background._gaq.push(["_trackEvent", name === null ? "Temp" : "Session", "Remove"]);
	}],
	
	savetemp: [function(){
		utils.tabs(function(tabs){
			sessions.temp = tabs;
		});
		
		background._gaq.push(["_trackEvent", "Temp", "Save"]);
	}],
	
	save: [function(){
		var $name = $("#main-save-name"), name = state.name = $name.val().trim();
		
		if (name) {
			$name.val("");
			
			utils.action("replace", sessions.list[name] ? 2 : 1);
		}
	}]
};


/*** events ***/
$("#main-saved-list, #main-saved-temp").on("click", "span > a", function(e){
	var name = state.name = (this.parentNode.parentNode.id === "main-saved-temp" ? null : this.parentNode.parentNode.dataset.name),
		action = this.innerText.toLowerCase();
	
	if (action === "open") {
		chrome.windows.getCurrent(function(win){
			background.openSession(win.id, name === null ? sessions.temp : sessions.list[name], e, name === null);
			window.close();
		});
	} else {
		utils.action(action);
	}
});

$("#export-text").click(function(){
	$(this).fadeOut(500).fadeIn(500)[0].select();
	document.execCommand("Copy");
	
	background._gaq.push(["_trackEvent", "Action", "Export"]);
});


/*** init ***/
sessions.load();

if (localStorage.readchanges !== "true") {
	$("#main-update").show().find("a").click(function(){
		background._gaq.push(["_trackEvent", "Action", "Changes"]);
	});
	
	localStorage.readchanges = true;
}

background._gaq.push(["_trackPageview", "/popup"]);

})();