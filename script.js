/** @format */

	hide("tab-acpSide");
	hide("tab-acpTaB");
	hide("tab-acpB");
	hide("tab-acpS");
	hide("tab-input");
	hide("tab-newData");
	hide("tab-update");
	hide("top-tab-acpSide");
	hide("top-tab-acpTaB");
	hide("top-tab-acpB");
	hide("top-tab-acpS");


//Setting Variables
let contractNo  = document.getElementById("contractNo"),
	wallQn      = document.getElementById("wallQn"),
	tallQn      = document.getElementById("tallQn"),
	baseQn      = document.getElementById("baseQn"),
	submit      = document.getElementById("submit"),
	update      = document.getElementById("update"),
	contracts ;

	//defining Model
	let modelCabinet = {
		contractNo: contractNo.value,
		type: "",
		cabinetName: "",
		cabinetDepth: 0,
		cabinetHeight: 0,
		cabinetWidth: 0,
		claddingSideQn: 2,
		claddingSideWidth: function () {return this.cabinetDepth - rules.cutRules.acpD;},
		claddingSideHeight: function () {return this.cabinetHeight - rules.cutRules.acpH;},
		claddingTaBQn: function () {if (this.type == "B") {	return 1;} else {return 2;}	},
		claddingTaBHeight: function () {return this.cabinetDepth - rules.cutRules.acpD;},
		claddingTaBWidth: function () {return this.cabinetWidth - rules.cutRules.acpH;},
		claddingBackQn: 1,
		claddingBackHeight: function () {return this.cabinetHeight - rules.cutRules.acpBackH;},
		claddingBackWidth: function () {return this.cabinetWidth - rules.cutRules.acpBackW;},
		claddingShelfQn: 2,
		claddingShelfWidth: function () {return this.cabinetWidth - rules.cutRules.acpShelfW;},
		claddingShelfHeight: function () {return this.cabinetDepth - rules.cutRules.acpShelfD;},
	};

//create contract
if(localStorage.contracts != null){contracts=JSON.parse(localStorage.contracts);}else{contracts = [];}

let rules = {
	cutRules: {acpH: 44,acpD: 36,acpShelfW: 62,acpShelfD: 67,acpBackH: 26,acpBackW: 26,	shelfTubeW: 50,	shelfTubeD: 55,	omgD: 48},
	measures: {front: 5800,back: 5800,depth: 5800,cladding: 3640,claddingH: 2800,claddingW: 1300,},};


// ==========================================================================================================
// =========================================== Buttons Actions ==============================================
// ==========================================================================================================

submit.onclick = function () {

	//adding contracts
	contracts[0] = {
		contractNo: contractNo.value,
		wallQn: wallQn.value,
		tallQn: tallQn.value,
		baseQn: baseQn.value,
		cabinets: {},
	};
	
	//adding cabinets
	//adding wall cabinets
	for (let i = 0; i < wallQn.value; i++) {
		let cabinetName = "W_" + (i + 1);
		contracts[0].cabinets[Object.keys(contracts[0]["cabinets"]).length] =Object.create(modelCabinet);
		contracts[0].cabinets[Object.keys(contracts[0]["cabinets"]).length-1].type ="W";
		contracts[0].cabinets[Object.keys(contracts[0]["cabinets"]).length-1].cabinetName = cabinetName;
	}
	//adding tall cabinets
	for (let i = 0; i < tallQn.value; i++) {
		let cabinetName = "T_" + (i + 1);
		contracts[0].cabinets[Object.keys(contracts[0]['cabinets']).length] = Object.create(modelCabinet);
		contracts[0].cabinets[Object.keys(contracts[0]['cabinets']).length-1].type = "T";
		contracts[0].cabinets[Object.keys(contracts[0]['cabinets']).length-1].cabinetName = cabinetName;
	}
	//adding Base cabinets
	for (let i = 0; i < baseQn.value; i++) {
		let cabinetName = "B_" + (i + 1);
		contracts[0].cabinets[Object.keys(contracts[0]['cabinets']).length] = Object.create(modelCabinet);
		contracts[0].cabinets[Object.keys(contracts[0]['cabinets']).length-1].type = "B";
		contracts[0].cabinets[Object.keys(contracts[0]['cabinets']).length-1].cabinetName = cabinetName;
		}
		
	// clearData();
	storeData("contracts", contracts);
	
	hide("tab-acpSide");
	hide("tab-acpTaB");
	hide("tab-acpB");
	hide("tab-acpS");
	hide("tab-input");
	hide("top-tab-acpSide");
	hide("top-tab-acpTaB");
	hide("top-tab-acpB");
	hide("top-tab-acpS");
	show("tab-update");
	show("tab-newData");
	
	
	spreadData();
	};
	
// spread data
function spreadData(){
	let cabinets = contracts[0].cabinets;
	let updateTable='';
	for (let i = 0; i < Object.keys(contracts[0]["cabinets"]).length; i++) {
		let height, depth;
		if (cabinets[i].type == "W") {depth = 350;}else{depth = 580;}
		if (cabinets[i].type == "T") {height = 2130;}else{height = 760;}
		updateTable += `
		<tr class="text-center">
            <td class="">${i + 1}</td>
            <td class=""><input type="text" disabled class=""
                id="${cabinets[i].cabinetName}_Name" value=${cabinets[i].cabinetName}></td>
			<td class=""><input type="number" required class=""
				id="${cabinets[i].cabinetName}_Height" value=${height}></td>
			<td class=""><input type="number" required	class=""
				id="${cabinets[i].cabinetName}_Depth" value=${depth} ></td>
			<td class=""><input type="number" class=""
				id="${cabinets[i].cabinetName}_Width" value="0" required></td>
        </tr>
		`;
	}
	document.getElementById("updateTable").innerHTML = updateTable;
}



// get update values
update.onclick = function (){ 
	updateCell();
	// autoHide("inputs-mian", "none");
	// autoHide("update-mian", "none");
	// autoHide("outputs-mian", "");
	
	// tabView("tab-update", "remove", "active");
	// tabView("tab-input", "remove", "active");
	// tabView("tab-acpSide", "add", "active");
	// tabView("tab-input", "add", "hide");
	// tabView("tab-update", "add", "hide");
	// tabView("tab-acpSide", "remove", "hide");
	// tabView("tab-acpTaB", "remove", "hide");
	// tabView("tab-acpB", "remove", "hide");
	// tabView("tab-acpS", "remove", "hide");
	// tabView("tab-newData", "remove", "hide");
		show("tab-acpSide");
		show("top-tab-acpSide");
		
		show("top-tab-acpTaB");
		show("top-tab-acpB");
		show("top-tab-acpS");

		hide("tab-input");
		hide("tab-update");
		show("tab-newData");
	
	
	
	spreadCladding();
	spreadCladdingTB();
	spreadCladdingB();
	spreadCladdingSh();
}

let newDataBtn = document.getElementById("tab-newData");
newDataBtn.addEventListener("click",function () {
	clearData();
	hide("tab-acpSide");
	hide("tab-acpTaB");
	hide("tab-acpB");
	hide("tab-acpS");
	hide("top-tab-acpSide");
	hide("top-tab-acpTaB");
	hide("top-tab-acpB");
	hide("top-tab-acpS");
	hide("tab-update");
	hide("tab-newData");
	show("tab-input");
});

let acpSideBtn = document.getElementById("tab-acpSide");
let acpTaBBtn = document.getElementById("tab-acpTaB");
let acpBBtn = document.getElementById("tab-acpB");
let acpSBtn = document.getElementById("tab-acpS");
let updateBtn = document.getElementById("tab-update");
let inputBtn = document.getElementById("tab-input");

acpSideBtn.addEventListener("click", function () {
	show("tab-acpSide");
	hide("tab-acpTaB");
	hide("tab-acpB");
	hide("tab-acpS");
	
	hide("tab-update");
	hide("tab-input");
	show("tab-newData");
});
acpTaBBtn.addEventListener("click", function () {
		hide("tab-acpSide");
		show("tab-acpTaB");
		hide("tab-acpB");
		hide("tab-acpS");

		hide("tab-update");
		hide("tab-input");
		show("tab-newData");
});
acpBBtn.addEventListener("click", function () {
		hide("tab-acpSide");
		hide("tab-acpTaB");
		show("tab-acpB");
		hide("tab-acpS");

		hide("tab-update");
		hide("tab-input");
		show("tab-newData");
});
acpSBtn.addEventListener("click", function () {
		hide("tab-acpSide");
		hide("tab-acpTaB");
		hide("tab-acpB");
		show("tab-acpS");

		hide("tab-update");
		hide("tab-input");
		show("tab-newData");
});
updateBtn.addEventListener("click", function () {
	hide("tab-acpSide");
	hide("tab-acpTaB");
	hide("tab-acpB");
	hide("tab-acpS");

	show("tab-update");
	hide("tab-input");
	hide("tab-newData");
});
inputBtn.addEventListener("click", function () {
		hide("tab-acpSide");
		hide("tab-acpTaB");
		hide("tab-acpB");
		hide("tab-acpS");

		hide("tab-update");
		show("tab-input");
		hide("tab-newData");
});
	





$(function () {
	$("li").click(function () {
		// remove classes from all
		$("li").removeClass("active");
		// add class to the one we clicked
		$(this).addClass("active");
	});
});
// ==========================================================================================================
// ============================================ Main Functions ==============================================
// ==========================================================================================================

//storing update values
function updateCell(){
	let cabinets = contracts[0].cabinets;
	for (let i = 0; i < Object.keys(contracts[0]["cabinets"]).length; i++) {
		let updatedCellHeight   =document.getElementById(cabinets[i].cabinetName+'_Height').value;
		let updatedCellWidth    =document.getElementById(cabinets[i].cabinetName+'_Width').value;
		let updatedCellDepth    =document.getElementById(cabinets[i].cabinetName+'_Depth').value;
		cabinets[i].cabinetDepth=updatedCellHeight;
		cabinets[i].cabinetHeight=updatedCellDepth ;
		cabinets[i].cabinetWidth=updatedCellWidth ;
	}
	storeData("contracts", contracts);
}

//create cladding Sides
function spreadCladding() {
	let updateTable = "";
	let cabinets = contracts[0].cabinets;
	for (let i = 0; i < Object.keys(contracts[0]["cabinets"]).length; i++) {
		updateTable += `
		<tr class="text-center">
            <td style="display: none" class=""   >${i + 1}</td>
            <td style="display: none" class=""   >${cabinets[i].cabinetName}</td>
			<td class=""                         >${cabinets[i].claddingSideHeight()}</td>
			<td class=""                         >${cabinets[i].claddingSideWidth()}</td>
			<td class=""                         >${cabinets[i].claddingSideQn}</td>
			<th class=""                         >K</th>
            <th class=""                         ></th>
			<td class=""                         >${cabinets[i].cabinetName}_Side_${contracts[0].contractNo}</td>
        </tr>
		`;
	}
	document.getElementById("claddingSide").innerHTML = updateTable;
}
	
	//create cladding Tob and Bottom
	function spreadCladdingTB() {
		let updateTable = "";
	let cabinets = contracts[0].cabinets;
	for (let i = 0; i < Object.keys(contracts[0]["cabinets"]).length; i++) {
		updateTable += `
		<tr class="text-center">
            <td style="display: none" class=""   >${i + 1}</td>
            <td style="display: none" class=""   >${cabinets[i].cabinetName}</td>
			<td class=""                         >${cabinets[i].claddingTaBHeight()}</td>
			<td class=""                         >${cabinets[i].claddingTaBWidth()}</td>
			<td class=""                         >${cabinets[i].claddingTaBQn()}</td>
			<th class=""                         >K</th>
            <th class=""                         ></th>
			<td class=""                         >${cabinets[i].cabinetName}_T&B_${contracts[0].contractNo}</td>
        </tr>
		`;
	}
	document.getElementById("table-cladding-tb").innerHTML = updateTable;
}
//create cladding Back
function spreadCladdingB() {
	let updateTable = "";
	let cabinets = contracts[0].cabinets;
	for (let i = 0; i < Object.keys(contracts[0]["cabinets"]).length; i++) {
		updateTable += `
		<tr class="text-center">
            <td style="display: none" class=""   >${i + 1}</td>
            <td style="display: none" class=""   >${cabinets[i].cabinetName}</td>
			<td class=""                         >${cabinets[i].claddingBackHeight()}</td>
			<td class=""                         >${cabinets[i].claddingBackWidth()}</td>
			<td class=""                         >${cabinets[i].claddingBackQn}</td>
			<th class=""                         >K</th>
            <th class=""                         ></th>
			<td class=""                         >${cabinets[i].cabinetName}_Back_${contracts[0].contractNo}</td>
        </tr>
		`;
	}
	document.getElementById("table-cladding-b").innerHTML = updateTable;
}
//create cladding Shelf
function spreadCladdingSh() {
	let updateTable = "";
	let cabinets = contracts[0].cabinets;
	for (let i = 0; i < Object.keys(contracts[0]["cabinets"]).length; i++) {
		updateTable += `
		<tr class="text-center">
            <td style="display: none" class=""   >${i + 1}</td>
            <td style="display: none" class=""   >${cabinets[i].cabinetName}</td>
			<td class=""                         >${cabinets[i].claddingShelfHeight()}</td>
			<td class=""                         >${cabinets[i].claddingShelfWidth()}</td>
			<td class=""                         >${cabinets[i].claddingShelfQn}</td>
			<th class=""                         >R</th>
            <th class=""                         ></th>
			<td class=""                         >${cabinets[i].cabinetName}_Shelf_${contracts[0].contractNo}</td>
        </tr>
		`;
	}
	document.getElementById("table-cladding-sh").innerHTML = updateTable;
}


// ==========================================================================================================
// ========================================== Helping Functions =============================================
// ==========================================================================================================

	// store data to local strage
function storeData(place,object){
	localStorage.setItem(place, JSON.stringify(object));
	console.log("Saved successfully.");
}

// clear inputs
function clearData(){
	contractNo.value    = '';
	wallQn.value        = '';
	tallQn.value        = '';
	baseQn.value        = '';    
}

// // auto hide by class name
// function autoHide(className,effect){
// 	let fileds = document.getElementsByClassName(className);
// 	for (let i = 0; i < fileds.length; i++) {
// 		fileds[i].style.display = effect;
// 	}
// }
// // auto hide by class name
// function autoHide2(className,effect,e="remove"){
// 	let fileds = document.getElementsByClassName(className);
	
// 	if(e === "add"){	
// 		fileds.classList.add(effect);
// 	}else{
// 		fileds.classList.remove(effect);
// 		}
// };
function hide(className) {
	let divs = document.getElementsByClassName(className);
	for (let i = 0; i < divs.length; i++) {
		divs[i].style.display = "none";
	}
};
function show(className) {
	let divs = document.getElementsByClassName(className);
	for (let i = 0; i < divs.length; i++) {
		divs[i].style.display = "";
	}
};
hide("tab-input");
show("tab-input");



// auto hide by class name
// function tabView(tabId,tabAction,tabClass){
// 	let fileds = document.getElementsByClassName(tabId);
// 		for (let i = 0; i < fileds.length; i++) {
// 			if(tabAction === "add"){	
// 				fileds.classList.add(tabClass);
// 			}else{
// 				fileds.classList.remove(tabClass);
// 			}
// 	}
// }

