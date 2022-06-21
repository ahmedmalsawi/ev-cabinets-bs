/** @format */

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
	autoHide("inputs-mian", "none");
	autoHide("update-mian", "");
	autoHide("outputs-mian", "none");
	autoHide("new-data", "none");
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
            <td class="border border-slate-300">${i + 1}</td>
            <td class="border border-slate-300"><input type="text" disabled class="text-cyan-800  text-center flex-grow p-2 bg-transparent mr-4 max-w-92 w-full "
                id="${cabinets[i].cabinetName}_Name" value=${cabinets[i].cabinetName}></td>
			<td class="border border-slate-300"><input type="number" required class="text-cyan-800 text-center flex-grow p-2 bg-transparent mr-4 max-w-92 w-full hover:bg-slate-50 focus:bg-slate-50"
				id="${cabinets[i].cabinetName}_Height" value=${height}></td>
			<td class="border border-slate-300"><input type="number" required	class="text-cyan-800 text-center flex-grow p-2 bg-transparent mr-4 max-w-92 w-full hover:bg-slate-50 focus:bg-slate-50"
				id="${cabinets[i].cabinetName}_Depth" value=${depth} ></td>
			<td class="border border-slate-300"><input type="number" class="text-cyan-800 text-center flex-grow p-2 bg-transparent mr-4 max-w-92 w-full hover:bg-slate-50 focus:bg-slate-50"
				id="${cabinets[i].cabinetName}_Width" value="0" required></td>
        </tr>
		`;
	}
	document.getElementById("updateTable").innerHTML = updateTable;
}



// get update values
update.onclick = function (){ 
	updateCell();
	autoHide("inputs-mian", "none");
	autoHide("update-mian", "none");
	autoHide("outputs-mian", "");
	spreadCladding();
	spreadCladdingTB();
	spreadCladdingB();
	spreadCladdingSh();
	autoHide("new-data", "");
}

newData.onclick = function () {
	autoHide("inputs-mian", "");
	autoHide("update-mian", "none");
	autoHide("outputs-mian", "none");
	autoHide("new-data", "none");
	clearData();
};

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
            <td style="display: none" class="border border-slate-300"   >${i + 1}</td>
            <td style="display: none" class="border border-slate-300"   >${cabinets[i].cabinetName}</td>
			<td class="border border-slate-300"                         >${cabinets[i].claddingSideHeight()}</td>
			<td class="border border-slate-300"                         >${cabinets[i].claddingSideWidth()}</td>
			<td class="border border-slate-300"                         >${cabinets[i].claddingSideQn}</td>
			<th class="border border-slate-300"                         >K</th>
            <th class="border border-slate-300"                         ></th>
			<td class="border border-slate-300"                         >${cabinets[i].cabinetName}_Side_${contracts[0].contractNo}</td>
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
            <td style="display: none" class="border border-slate-300"   >${i + 1}</td>
            <td style="display: none" class="border border-slate-300"   >${cabinets[i].cabinetName}</td>
			<td class="border border-slate-300"                         >${cabinets[i].claddingTaBHeight()}</td>
			<td class="border border-slate-300"                         >${cabinets[i].claddingTaBWidth()}</td>
			<td class="border border-slate-300"                         >${cabinets[i].claddingTaBQn()}</td>
			<th class="border border-slate-300"                         >K</th>
            <th class="border border-slate-300"                         ></th>
			<td class="border border-slate-300"                         >${cabinets[i].cabinetName}_Side_${contracts[0].contractNo}</td>
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
            <td style="display: none" class="border border-slate-300"   >${i + 1}</td>
            <td style="display: none" class="border border-slate-300"   >${cabinets[i].cabinetName}</td>
			<td class="border border-slate-300"                         >${cabinets[i].claddingBackHeight()}</td>
			<td class="border border-slate-300"                         >${cabinets[i].claddingBackWidth()}</td>
			<td class="border border-slate-300"                         >${cabinets[i].claddingBackQn}</td>
			<th class="border border-slate-300"                         >K</th>
            <th class="border border-slate-300"                         ></th>
			<td class="border border-slate-300"                         >${cabinets[i].cabinetName}_Side_${contracts[0].contractNo}</td>
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
            <td style="display: none" class="border border-slate-300"   >${i + 1}</td>
            <td style="display: none" class="border border-slate-300"   >${cabinets[i].cabinetName}</td>
			<td class="border border-slate-300"                         >${cabinets[i].claddingShelfHeight()}</td>
			<td class="border border-slate-300"                         >${cabinets[i].claddingShelfWidth()}</td>
			<td class="border border-slate-300"                         >${cabinets[i].claddingShelfQn}</td>
			<th class="border border-slate-300"                         >R</th>
            <th class="border border-slate-300"                         ></th>
			<td class="border border-slate-300"                         >${cabinets[i].cabinetName}_Side_${contracts[0].contractNo}</td>
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

// auto hide by class name
function autoHide(className,effect){
	let fileds = document.getElementsByClassName(className);
	for (let i = 0; i < fileds.length; i++) {
		fileds[i].style.display = effect;
	}
}