//Generic
var confirmLeave = false;
var loadInfo = false;
var isFormProcessing = false;

const PROMPT_TYPE = Object.freeze({
	None: 1,
	ChatGPTSystem: 2,
	Title: 3,
	Description: 4,
	P: 5,
	H1: 6,
	H2: 7,
	H3: 8,
	H4: 9,
	H5: 10,
	H6: 11
});


//Modals Log - Prompts
var $ModalSeoStats = $("#ModalSeoStats");

//Modals Log - Prompts
var $ModalPromptsLogs = $("#ModalLogs");


var campaign = {};

var activeResultId;
var resultP = 0;


//Main Container
var $MainContainer = $('#container');
var $ContainerLayout = $('#MainContainer');

//Modals Forms - ChatGptPrompt
var $ModalFormChatGptPrompt = $("#ModalChatGptPrompt");
var $FormChatGptPrompt = $("#FormChatGptPrompt");
var $AlertFormChatGptPrompt = $('#AlertFormChatGptPrompt');

var filterCampaignId;
var businessOfferInfo;

//DhxLayoutCell - ChatGptPrompt
var dhxToolbarChatGptPrompt;
var campaignPromptList;

//Paging URL by dhxGrid
function GetPaginUrl(pager, pageNum) {
	switch (pager) {
		case 'ChatGptPrompt':
			return UrlChatGptPrompt(pageNum);
	}
}

//URL - ChatGptPrompt
var urlBaseChatGptPrompt = 'SEOContent/ChatGptPrompt/';
function UrlChatGptPrompt(newPage, newSearch, newPageSize) {

	pageNumberChatGptPrompt = newPage || pageNumberChatGptPrompt;
	strSearchChatGptPrompt = newSearch || strSearchChatGptPrompt;
	pageSizeChatGptPrompt = newPageSize || pageSizeChatGptPrompt;

	return rootPath + urlBaseChatGptPrompt + "All?PageNumber=" + pageNumberChatGptPrompt + "&PageSize=" + pageSizeChatGptPrompt + "&campaignId=" + filterCampaignId;
}
function UrlExportChatGptPrompt(format) {
	url = rootPath + urlBaseChatGptPrompt + "ExportData?PageNumber=" + pageNumberChatGptPrompt + "&PageSize=" + pageSizeChatGptPrompt + "&strSearch=" + strSearchChatGptPrompt + "&format=" + format + "&area=ChatGptPrompt";
	window.location.replace(url);
}

//DhxLayout
function onReady() {
	SetContainerAvailableHeight($MainContainer, $ContainerLayout, 155);
	initModalFormChatGptPrompt();

	$("#ToneVoiceSelect").select2({
		dropdownParent: $('#ModalChatGptPrompt'),
		width: 'resolve'
	});

}
function onResize() {
	SetContainerAvailableHeight($MainContainer, $ContainerLayout, 155);
}

//Init DhxLayout 
function initLayout() {

	//Attach Layout
	dhxLayout = new dhtmlXLayoutObject({
		pattern: '1C',
		parent: 'MainContainer',
		offsets: {
			top: 0,
			left: 0,
			right: 0,
			bottom: 0
		},
		cells: [
			{ id: 'a', text: 'ChatGpt Prompts', header: true, fix_size: [false, false] }
		]
	});

	dhxLayout.cells('a').attachHTMLString('<div id="promptContainer"></div>');

	//Set Progress On
	dhxLayout.progressOn();

	//Load DhxLayout
	InitBoxChatGptPrompt();
}

//Grid box
async function InitBoxChatGptPrompt() {
	InitDhxToolbarChatGptPrompt();
	await loadCamapaignFilter();

	if ($('.selectpicker').length > 0) {
		$('.selectpicker').on('hide.bs.select', function () {
			$(this).trigger("focusout");
		});

		$('.selectpicker').selectpicker('refresh');

		$('#filterCampaign').on('changed.bs.select', async function (e, clickedIndex, isSelected, previousValue) {

			if (isNumeric($(this).val())) {

				localStorage.setItem('filterCampaignId', $(this).val());
				await getPromptsByCampaign(campaignId);
			}
			else {
				localStorage.setItem('filterCampaignId', '');
				dhxLayout.cells('a').setText('ChatGpt Prompts');
			}

		});
	}

	var campaignId = localStorage.getItem('filterCampaignId');

	if (!IsNullOrEmpty(campaignId))
		await getPromptsByCampaign(campaignId);

	var newPanel = getPanelLayout();
	$('#promptContainer').append(newPanel);
}

//Toolbar
function InitDhxToolbarChatGptPrompt() {

	//Load DhcToolbar Config
	GetDhxToolbarChatGptPrompt();

	//If Read Only remove New Button
	if (isReadOnly) {
		dhxToolbarChatGptPrompt.removeItem("new");
	}

	//Add Space
	dhxToolbarChatGptPrompt.addSpacer("sendChatGtp");

	//DhxToolbar Commands
	dhxToolbarChatGptPrompt.attachEvent("onClick", function (id) {
		switch (id) {
			case "new":

				var campaignId = $('#filterCampaign').selectpicker('val');

				if (IsNullOrEmpty(campaignId)) {
					swal("Action Required", "To continue, you must select the SEO Campaign", "info");
				}
				else {
					OpenFormChatGptPrompt();
				}

				break;
			case "delete":

				if (!isReadOnly)
					deleteChatGptPrompt();

				break;
			case "reload":
				var campaignId = $('#filterCampaign').selectpicker('val');
				if (!IsNullOrEmpty(campaignId)) {
					$('#promptContainer').empty();
					getPromptsByCampaign(campaignId);
				}
				break;
			case "sendChatGtp":
				submitChatGPT();
				break;
		}
	});
}
//DhxToolbar Config
function GetDhxToolbarChatGptPrompt() {
	dhxToolbarChatGptPrompt = dhxLayout.cells('a').attachToolbar({
		iconset: "awesome",
		items: [
			{
				type: "buttonSelect", id: "new", text: "New", img: "far fa-file", img_disabled: "far fa-file", renderSelect: true, openAll: false,
				options: [
					{ type: "button", id: "delete", text: "Delete", img: "fas fa-trash", img_disabled: "fas fa-trash" }
				]
			},
			{
				type: "buttonSelect", id: "copyClipboard", text: "Copy", img: "fa fa-clipboard", img_disabled: "fa fa-file-o", renderSelect: false, openAll: true,
				options: [
					{ type: "button", id: "copyExcel", text: "Copy to Excel", img: "fa fa-file-excel-o", img_disabled: "fa fa-file-excel-o" },
					{ type: "button", id: "copyCSV", text: " Copy to CSV", img: "fa fa-file-text-o", img_disabled: "fa fa-file-text-o" }
				]
			},
			{ type: "button", id: "reload", text: "Refresh", img: "fas fa-sync-alt", img_disabled: "fas fa-sync-alt" },
			{ type: "separator", id: "sep2" },
			{ type: "button", id: "sendChatGtp", text: "Submit to ChatGPT", img: "fas fa-angle-double-right", img_disabled: "fas fa-angle-double-right" },
			{ type: "text", id: "filterCampaign", text: addToolbarBootstrapSelect({ id: 'filterCampaign', container: 'body', title: 'Select Campaign', width: '250', search: true }) }
		],
		onload: function () {
		}
	});
}

//Modal - ChatGptPrompt
function OpenFormChatGptPrompt(rId) {

	$('.alert').hide('slow').removeClass('alert-success').removeClass('alert-danger');

	// reset modal body with a spinner or empty content
	$('#modal-loading').fadeIn();
	$(".modal-title", $ModalFormChatGptPrompt).html("ChatGPT Prompt");
	$ModalFormChatGptPrompt.modal("show");

	$('#SeoCampaignId').val(campaign.id);

	if (rId)
		loadChatGptPrompt(rId);
	else
		$('#modal-loading').fadeOut();
}

//Modal Buttons - ChatGptPrompt
function initModalFormChatGptPrompt() {

	//Button Save-ChatGptPrompt
	$('.modal-dialog > .modal-content > .modal-footer button.btnSave', $ModalFormChatGptPrompt).on('click', function (event) {
		submitFormChatGptPrompt();
	});

	$(' > .modal-dialog > .modal-content > .modal-footer button.btnNew', $ModalFormChatGptPrompt).on('click', function (event) {
		hideFormAlert($AlertFormChatGptPrompt);
		clearForm($FormChatGptPrompt);
	});

	$('#promptBuilder').on('click', function () {
		buildPrompt();
	});

	//Modal-ChatGptPrompt
	$ModalFormChatGptPrompt.on('hidden.bs.modal', function () {
		clearForm($FormChatGptPrompt);
		$("#ChatGptRolId").selectpicker('val', '');
		$("#ControlTypeId").selectpicker('val', '');
		$("#LanguageCode").selectpicker('val', '');
		$("#ToneVoiceSelect").select2("val", "");
		$('#ToneVoiceSelect').trigger('change');
	});

	//Enter key Naviation
	enterFormNavigation($FormChatGptPrompt);
}

//Form - ChatGptPrompt
async function submitFormChatGptPrompt() {

	//Form validate
	if (isFormProcessing)
		return;

	if ($FormChatGptPrompt.valid()) {

		var tonevoices = $('#ToneVoiceSelect').select2('data');

		if (tonevoices.length > 0) {

			var result = tonevoices.map(a => a.id);

			if (result.length > 0) {
				$('#ToneVoiceRequest', $FormChatGptPrompt).val(result.join());
			}
		}

		var formData = formToJsonString(document.getElementById($FormChatGptPrompt.attr('Id')));

		// Start loading
		$('#modal-loading').fadeIn();

		disableAll($FormChatGptPrompt, true);
		isFormProcessing = true;

		var response = await ajaxCall(rootPath + urlBaseChatGptPrompt + 'id', formData, false, Method.POST, Datatype.Json, ContentType.Json);

		if (response.Result) {
			if (response.Data !== undefined) {
				$('#id').val(response.Data.id);

				updatePromptPanel(response.Data);
			}
		}

		showFormAlert(response.MessageType, response.Title, response.Message, $AlertFormChatGptPrompt, response.Errors);

		disableAll($FormChatGptPrompt, false);
		isFormProcessing = false;
		$('#modal-loading').fadeOut();

	}
}

//Edit - ChatGptPrompt
function loadChatGptPrompt(promptId) {

	clearForm($FormChatGptPrompt);

	if (!loadInfo) {

		$('#modal-loading').fadeIn();

		var prompt = campaign.prompts.find(obj => {
			return obj.id === promptId
		})

		if (!IsNull(prompt)) {

			$('#Id', $FormChatGptPrompt).val(prompt.id);
			$('#SeoCampaignId', $FormChatGptPrompt).val(campaign.id);
			$('#ChatGptRolId', $FormChatGptPrompt).selectpicker('val', prompt.chatGptRolId);
			$('#ControlTypeId', $FormChatGptPrompt).selectpicker('val', prompt.controlTypeId);
			$('#LanguageCode', $FormChatGptPrompt).selectpicker('val', prompt.languageCode);
			$('#TenseId', $FormChatGptPrompt).selectpicker('val', prompt.tenseId);
			$('#Name', $FormChatGptPrompt).val(prompt.name);
			$('#Prompt', $FormChatGptPrompt).val(prompt.prompt);
			$('#MinLength', $FormChatGptPrompt).val(prompt.minLength);
			$('#MaxLength', $FormChatGptPrompt).val(prompt.maxLength);
			$('#MinWord', $FormChatGptPrompt).val(prompt.minWord);
			$('#MaxWord', $FormChatGptPrompt).val(prompt.maxWord);

			$('#Active', $FormChatGptPrompt).prop('checked', prompt.active);

			if (prompt.toneVoices.length > 0) {

				var toneArray = prompt.toneVoices.map(a => a.toneVoiceId);
				var toneVoiceIds = toneArray.join(',');

				$('#ToneVoiceRequest', $FormChatGptPrompt).val(toneVoiceIds);

				$('#ToneVoiceSelect', $FormChatGptPrompt).val(toneArray);
				$('#ToneVoiceSelect').trigger('change');

			}
		}

		$('#modal-loading').fadeOut();
	}
}

//Delete - ChatGptPrompt
async function deleteChatGptPrompt(ChatGptPromptId) {

	swal({
		title: 'Delete Prompt?',
		text: "Please, confirm!",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Delete!'
	}).then(async (result) => {

		if (result.value) {

			var urlDelete = rootPath + urlBaseChatGptPrompt + "Delete?rnd=" + createRandomString(10);
			var parameter = JSON.stringify({ id: ChatGptPromptId });

			var response = await ajaxCall(urlDelete, parameter, false, Method.POST, Datatype.Json, ContentType.Json)

			if (response.Result) {

				$('#PanelPrompt_' + ChatGptPromptId).remove();

				Swal.fire(
					response.Title,
					response.Message,
					response.Action
				);
			}
			else {
				ShowMessage(response.MessageType, response.Title, response.Message, true, 'toast-bottom-center');
			}
		}
	});
}

//Load Business Offer Select
async function loadBusinessOfferList(companyId) {

	if (!IsNullOrEmpty(companyId)) {

		// Start loading
		$('#modal-loading').fadeIn();

		var parameters = `companyId=${companyId}`;

		var response = await ajaxCall(rootPath + urlBaseChatGptPrompt + 'GetBusinessOfferList?' + parameters, null, false, Method.GET, Datatype.Json, ContentType.Json);

		if (response.Result) {

			$('#BusinessOfferId').empty();

			if (!IsNull(response.Data)) {

				var businessOfferList = response.Data;

				if (businessOfferList.length > 0)
					$('#BusinessOfferId').prop('disabled', false);

				//Filtro Tipo Periodo
				for (var i = 0; i < businessOfferList.length; i++) {
					$('#BusinessOfferId').append('<option data-tokens="' + businessOfferList[i].text + '" value="' + businessOfferList[i].value + '">' + businessOfferList[i].text + '</option>');
				}

				$('#BusinessOfferId').selectpicker('refresh');

				var ChatGptPromptId = dhxGridChatGptPrompt.getSelectedRowId();
				if (businessOfferList.length > 0 && !IsNull(ChatGptPromptId)) {
					var businessOfferOpt = dhxGridChatGptPrompt.cells(ChatGptPromptId, dhxGridChatGptPrompt.getColIndexById("BusinessOfferId")).getValue();

					if (!IsNullOrEmpty(businessOfferOpt))
						$('#BusinessOfferId', $FormChatGptPrompt).selectpicker('val', businessOfferOpt);

				}
			}

		}

		//Set Progress On
		$('#modal-loading').fadeOut();
	}
}

//Get Prompts by campaign Id
async function getPromptsByCampaign(campaignId) {

	dhxLayout.progressOn();

	var response = await ajaxCall(rootPath + urlBaseChatGptPrompt + 'GetPromptsByCampaing?campaignId=' + campaignId, null, false, Method.GET, Datatype.Json, ContentType.Json);

	if (response.Result) {

		if (!IsNull(response.Data)) {

			campaign = response.Data;

			if (campaign.id > 0) {
				dhxLayout.cells('a').setText('ChatGpt Prompts: ' + campaign.businessOffer.name + ' - ' + campaign.company.name);

				getCampaignPrompt(campaign);
			}
		}
	}

	dhxLayout.progressOff();

}

//Load Filters
async function loadCamapaignFilter() {

	var response = await ajaxCall(rootPath + urlBaseChatGptPrompt + 'GetCampaignFilters', null, false, Method.GET, Datatype.Json, ContentType.Json);

	if (response.Result) {

		if (!IsNull(response.Data)) {


			if (IsNull(response.Data)) {
				swal("No active campaigns found", "", "info");
			} else {

				var campaignList = response.Data;
				//Campaign Filter
				for (var i = 0; i < campaignList.length; i++) {
					$('#filterCampaign').append('<option data-tokens="' + campaignList[i].text + '" value="' + campaignList[i].value + '">' + campaignList[i].text + '</option>');
				}

				$('#filterCampaign').selectpicker('refresh');

				var filterCampaignId = localStorage.getItem('filterCampaignId');

				if (!IsNullOrEmpty(filterCampaignId))
					$('#filterCampaign').selectpicker('val', filterCampaignId);
			}
		}
	}

	//Set Progress On
	dhxLayout.progressOff();
}

//Load BusinessOffer Info
function getBusinessOffer() {

	dhxLayout.cells('a').setText(businessOfferInfo.companyName + ': ' + businessOfferInfo.name);
}

async function buildPrompt() {

	var roltext = $('#ChatGptRolId').find('option:selected').map(function () {
		return $(this).text();
	}).get().join(',');
	var controlTypeText = $('#ControlTypeId').find('option:selected').map(function () {
		return $(this).text();
	}).get().join(',');

	var langCodeText = $('#LanguageCode').find('option:selected').map(function () {
		return $(this).text();
	}).get().join(',');
	var toneVoiceTextList = $('#ToneVoiceSelect').find('option:selected').map(function () {
		return $(this).text();
	}).get().join(',');
	var tenseText = $('#TenseId').find('option:selected').map(function () {
		return $(this).text();
	}).get().join(',');

	if (IsNullOrEmpty(roltext) || IsNullOrEmpty(controlTypeText)) {
		swal("Action Required", "To continue, you must select Prompt Rol and Control Type.", "info");
	}
	else
	{
		var minChar = $('#MinLength').val();
		var maxChar = $('#MaxLength').val();
		var minWords = $('#MinWord').val();
		var maxWords = $('#MaxWord').val();

		var promptLength = getPromptLenghtCondition(minChar, maxChar, 'chars');
		promptLength += getPromptLenghtCondition(minWords, maxWords, 'words');

		if (!IsNullOrEmpty(langCodeText))
			langCodeText = langString(langCodeText);

		if (!IsNullOrEmpty(toneVoiceTextList))
			toneVoiceTextList = langString(toneVoiceTextList);

		if (!IsNullOrEmpty(promptLength))
			promptLength += 'including spaces, with no question statements. ';


		var strPrompt = `Create a ${controlTypeText} using a ${toneVoiceTextList} tone of voice in ${tenseText}, it must be in ${langCodeText} with the main keywords  and keywords. `;
		strPrompt += promptLength;

		$('#Prompt').val(cleanStringForPrompt(strPrompt));
	}
}

async function submitChatGPT(promptId) {

	var campaignId = $('#filterCampaign').selectpicker('val');

	if (IsNullOrEmpty(campaignId)) {
		swal("Action Required", "To continue, you must select the SEO Campaign", "info");
	}
	else {

		swal({
			title: 'Please, confirm!',
			text: 'Send list of prompts to ChatGPT API',
			type: 'info',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes!'
		}).then(async (result) => {

			if (result.value) {
				//Set Progress On
				dhxLayout.progressOn();

				campaignId = $('#filterCampaign').selectpicker('val');

				var response = await ajaxCall(rootPath + urlBaseChatGptPrompt + 'UseChatGpt?campaignId=' + campaignId + '&promptId=' + promptId, null, false, Method.GET, Datatype.Json, ContentType.Json);

				if (response.Result) {
					if (response.Data !== undefined) {
						for (var i = 0; i < response.Data.length; i++) {
							updatePromptPanel(response.Data[i]);
						}
					}

					resultP = 0;
				}
				else {
					//const responseError = parseErrorStringToJson(response.Errors[0].message);
					//swal(Error, response.Errors[0].message, "warning");

					var campaignId = $('#filterCampaign').selectpicker('val');
					if (!IsNullOrEmpty(campaignId)) {
						$('#promptContainer').empty();
						getPromptsByCampaign(campaignId);
					}

				}

				//Set Progress On
				dhxLayout.progressOff();
			}
		});
	}
}


//Helper functions
function getPromptLenghtCondition(minLen, maxLen, type) {

	if (!IsNullOrEmpty(minLen) && !IsNullOrEmpty(maxLen))
		return `Desired ${type} length between ${ minLen } and ${ maxLen }. `; 

	if (!IsNullOrEmpty(minLen) && IsNullOrEmpty(maxLen))
		return `Desired a minimum ${minLen} chars. `; 

	if (IsNullOrEmpty(minLen) && !IsNullOrEmpty(maxLen))
		return `Imperative to not exceed more than ${maxLen} chars. `; 

	return '';
}
function cleanStringForPrompt(input) {
	// Remove special characters and extra whitespace
	var cleaned = input.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim();

	// Limit the length of the cleaned string (adjust as needed)
	const maxLength = 4000;
	if (cleaned.length > maxLength) {
		cleaned = cleaned.substring(0, maxLength);
	}

	// Ensure the cleaned text ends with a space
	if (!cleaned.endsWith(' ')) {
		cleaned += ' ';
	}

	return cleaned;
}

function langString(langList) {
	var lanstr = "";

	if (!IsNullOrEmpty(langList)) {
		var arrLang = langList.split(',');

		if (arrLang.length < 3) {
			lanstr = langList.replace(',', ' and ');
		}
		else {
			for (var i = 0; i < arrLang.length; i++) {

				if (i == arrLang.length - 1)
					lanstr += ' and ' + arrLang[i];
				else
					lanstr += arrLang[i] + ', ';
			}
		}
	}

	return lanstr.replace(',  and ', ' and ')

}

//Prompt Panel Container
function getCampaignPrompt() {

	onResize();

	var htmlCode = `<div class="resultHtml">\r`;

	var prompts = campaign.prompts;

	$('#promptContainer').append(getPanelCollapsed());

	for (var i = 0; i < prompts.length; i++) {

		if (prompts.sent > 0)
			dhxToolbarChatGptPrompt.disableItem("sendChatGtp");
		else
			dhxToolbarChatGptPrompt.enableItem("sendChatGtp");

		var promptItem = prompts[i];


		if (promptItem.controlTypeId == PROMPT_TYPE.ChatGPTSystem) {

			$('#PanelPromptContext div.panel-body').append(`
							<div class="well well-lg" style="margin: 10px !important;">
								${promptItem.prompt}
							</div>
						`);
		}
		else {
			addPanel(promptItem);
		}
	}

	htmlCode += '</div>';
}
function addPanel(promptItem) {

	var newPanel = getPanelLayout(promptItem);
	$('#promptContainer').append(newPanel);
	updatePanelResult(promptItem);

	//for (var j = 0; j < promptItem.result.length; j++) {

	//	var elementId = `resultIdTag_${promptItem.result[j].id}`;

	//	htmlCode += `<div id="${elementId}">\r`;

	//	if (promptItem.controlTypeId == PROMPT_TYPE.Title || promptItem.controlTypeId == PROMPT_TYPE.Description) {
	//		htmlCode += `<p>${promptItem.result[j].response}</p>`;
	//	}
	//	else {
	//		htmlCode += `<${promptItem.controlType}>${promptItem.result[j].response}</${promptItem.controlType}>`;
	//	}
	//}

	$('.carousel').bind('slide.bs.carousel', function (e) {

		var index = $(e.relatedTarget).index();
		var id = $(this).prop('id').replace('carousel_', '');
		var pElement = $('#' + $(this).prop('id') + '_' + index);

		$('[data-target="#' + $(this).prop('id') + '"]').each(function (i, element) {

			if (i === index) {
				$(this).addClass('active');
				activeResultId = id;
				updateResultFooterStats(id, index, pElement);
			} else {
				$(this).removeClass('active');
			}
		});
	});

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		enableFooterBar($(e.target).data("id"), $(e.target).data("name"));
	});


}
function getPanelCollapsed() {
	return `
			<div id="PanelPromptContext" class="panel" style="margin: 10px;border: solid 1px #e1e1e1;">
				<!--Panel heading-->
				<div class="panel-heading">
					<div class="panel-control">
						<button class="btn btn-default" data-panel="minmax" data-target="#panel-collapse-804c" data-toggle="collapse" aria-expanded="false"><i class="demo-psi-chevron-down"></i></button>
					</div>
					<h3 class="panel-title">ChatGPT Context Instructions</h3>
				</div>
				<div id="panel-collapse-804c" class="collapse">
					<div class="panel-body"></div>
				</div>
			</div>`;
}
function getPanelLayout(promptInfo) {

	var toneVoiceList = '';

	var statsChars = '';
	var statsSpaces = '';
	var statsWords = '';
	var statsSentences = '';
	var statsParagraphs = '';
	var statsAll = '';

	if (IsNull(promptInfo))
		return;

	if (promptInfo.toneVoices.length > 0) {
		var arrToneVoiceList = promptInfo.toneVoices.map(a => a.tone);
		toneVoiceList = arrToneVoiceList.join(',');
	}
	else {
		toneVoiceList = 'None';
	}

	if (IsNullOrEmpty(promptInfo.result))
		promptInfo.result = '';

	var promptCounterText = [];
	Countable.count(promptInfo.prompt, counter => { promptCounterText = counter; });

	return `<div id="PanelPrompt_${promptInfo.id}" class="panel" style="margin: 10px;border: solid 1px #e1e1e1;">
					<!--Panel heading-->
					<div class="panel-heading">
						<div class="panel-control">
							<ul class="nav nav-tabs" role="tablist">
								<li role="presentation" class="active">
									<a href="#tabResult_${promptInfo.id}" aria-controls="tabResult_${promptInfo.id}" role="tab" data-toggle="tab" data-id="${promptInfo.id}" data-name="Result">Result</a>
								</li>
								<li role="presentation">
									<a href="#tabPrompt_${promptInfo.id}" aria-controls="tabPrompt_${promptInfo.id}" role="tab" data-toggle="tab" data-id="${promptInfo.id}" data-name="Prompt">Prompt</a>
								</li>
							</ul>
							<button data-id="${promptInfo.id}" onclick="openPromptLogs(${promptInfo.id});" class="btn btn-default" data-panel="dismiss" title="View Logs"><i class="fa fa-file-alt"></i></button>
							<button data-id="${promptInfo.id}" onclick="deleteChatGptPrompt(${promptInfo.id});" class="btn btn-default" data-panel="dismiss" title="Delete Prompt"><i class="fa fa-trash"></i></button>
							<button data-id="${promptInfo.id}" onclick="submitChatGPT(${promptInfo.promptId});" class="btn btn-default"><i class="fa fa-sync" title="Refresh Prompt"></i></button>
							<button data-id="${promptInfo.id}" onclick="OpenFormChatGptPrompt(${promptInfo.id});" class="btn btn-default" title="Edit Prompt"><i class="fa fa-edit"></i></button>
						</div>
						<h3 class="panel-title">${promptInfo.name}</h3>
					</div>
					
					<!--Panel body-->
					<div class="panel-body">
						<div id="PanelTab_${promptInfo.id}" class="tab-content pad-no mar-no">
							<div id="tabResult_${promptInfo.id}" class="tab-pane fade in active">
								<div class="nano" style="height: 100px">
									<div class="nano-content">
										<div id="carousel_${promptInfo.id}" class="carousel slide" data-ride="true" data-interval="false">
											<div class="carousel-inner pad-no mar-no" role="listbox">
												<!--Item 1-->
												<div class="item mar-no pad-no active">
													<h4 id="carouselTitle_${promptInfo.id}_0" class="text-main" style="margin:0 5px 5px 0;">Result 01</h4>
												</div>
					
												<!--Item 2-->
												<div class="item mar-no pad-no">
													<h4 id="carouselTitle_${promptInfo.id}_1" class="text-main" style="margin:0 5px 5px 0;">Result 02</h4>
												</div>
					
												<!--Item 3-->
												<div class="item mar-no pad-no">
													<h4 id="carouselTitle_${promptInfo.id}_2" class="text-main" style="margin:0 5px 5px 0;">Result 03</h4>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div id="tabPrompt_${promptInfo.id}" class="tab-pane fade">
								<div class="nano" style="height: 100px">
									<div class="nano-content">
										<p id="promptId_${promptInfo.id}">${toString(promptInfo.prompt)}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="panel-footer" style="height:41px;">
						<div id="resultFooter_${promptInfo.id}">
							<div style="display:flex;height:20px;">
								<div style="padding: 2px 10px;" class="resultTotalCharacters"><span class="text-success">Characters:</span> <span class="statsChars">${statsChars}</span></div>&nbsp;&nbsp;
								<div style="padding: 2px 10px;" class="resultTotalSpaces"><span class="text-success">Spaces:</span> <span class="statsSpaces">${statsSpaces}</span></div>&nbsp;&nbsp;
								<div style="padding: 2px 10px;" class="resultTotalWords"><span class="text-success">Words:</span> <span class="statsWords">${statsWords}</span></div>&nbsp;&nbsp;
								<div style="padding: 2px 10px;" class="resultTotalSentences"><span class="text-success">Sentences:</span> <span class="statsSentences">${statsSentences}</span></div>
								<div style="padding: 2px 10px;" class="resultTotalParagraphs"><span class="text-success">Paragraphs:</span> <span class="statsParagraphs">${statsParagraphs}</span></div>
								<div style="padding: 2px 10px;" class="resultTotalAll"><span class="text-success">Total:</span> <span class="statsAll">${statsAll}</span></div>
								<div style="padding: 0 10px;text-align:center;"><button class="btn btn-xs btn-primary btn-labeled" onclick="openSeoStats(${promptInfo.id});"><i class="btn-label demo-psi-star"></i> View SEO Stats</button></div>
								<div style="padding: 2px 10px;margin-left:auto;">
									<!--Indicators-->
									<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
									<ol class="carousel-indicators out pad-no" style="position:initial;padding-top:3px;width:auto;left:0;margin-left:0x;text-align:right;">
										<li data-target="#carousel_${promptInfo.id}" data-slide-to="0" class="active"></li>
										<li data-target="#carousel_${promptInfo.id}" data-slide-to="1"></li>
										<li data-target="#carousel_${promptInfo.id}" data-slide-to="2"></li>
									</ol>
									<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
								</div>
							</div>
						</div>
						<div id="promptFooter_${promptInfo.id}" style="display:none;">
							<div style="display:flex;">
								<div style="padding-right:10px;" class="promptRol"><i class="fas fa-check-circle text-muted"></i></div>
								<div style="padding:0 10px;" class="promptRol"><span class="text-success">Rol:</span> <span id="PromptRol_${promptInfo.id}" >${promptInfo.chatGptRol}</span></div>&nbsp;&nbsp;
								<div style="padding:0 10px;" class="promptControl"><span class="text-success">Control:</span> <span id="PromptControl_${promptInfo.id}">${promptInfo.controlType}</span></div>&nbsp;&nbsp;
								<div style="padding:0 10px;" class="promptLanguage"><span class="text-success">Lang:</span> <span id="PromptLanguage_${promptInfo.id}">${promptInfo.languageCode}</span></div>&nbsp;&nbsp;
								<div style="padding:0 10px;" class="promptToneVoice"><span class="text-success">Tone Voice:</span> <span id="PromptToneVoice_${promptInfo.id}">${toneVoiceList}</span></div>
								<div style="padding:0 10px;" class="promptTotalWords"><span class="text-success">Words:</span> <span id="PromptTotalWords_${promptInfo.id}">${promptCounterText.words}</span></div>
								<div style="padding:0 10px;" class="promptTotalChars"><span class="text-success">Chars:</span> <span id="PromptTotalChars_${promptInfo.id}">${promptCounterText.all}</span></div>
							</div>
						</div>
				   </div>
				</div>`;
}
function updatePromptPanel(prompt) {

	if (!IsNull(prompt)) {

		var toneVoiceList = 'None';

		if (!IsNull(prompt.toneVoices)) {
			if (prompt.toneVoices.length > 0) {
				var arrToneVoiceList = prompt.toneVoices.map(a => a.tone);
				toneVoiceList = arrToneVoiceList.join(',');
			}
		}

		if (!IsNull(prompt.prompt)) {
			var promptCounterText = [];
			Countable.count(prompt.prompt, counter => { promptCounterText = counter; });

			//Update Prompt
			$('#promptId_' + prompt.id).html(prompt.prompt);
			$('#PromptRol_' + prompt.id).html(prompt.chatGptRol);
			$('#PromptControl_' + prompt.id).html(prompt.controlType);
			$('#PromptLanguage_' + prompt.id).html(prompt.language);
			$('#PromptToneVoice' + prompt.id).html(toneVoiceList);
			$('#PromptTotalWords_' + prompt.id).html(promptCounterText.words);
			$('#PromptTotalChars_' + prompt.id).html(promptCounterText.all);

			//updateArray
			promptIndex = campaign.prompts.findIndex((obj => obj.id == prompt.id));

			if (promptIndex < 0) {
				campaign.prompts.push(prompt);
				addPanel(prompt);
			}
			else {

				campaign.prompts[promptIndex].chatGptRolId = prompt.chatGptRolId;
				campaign.prompts[promptIndex].chatGptRol = prompt.chatGptRol;
				campaign.prompts[promptIndex].controlTypeId = prompt.controlTypeId;
				campaign.prompts[promptIndex].controlType = prompt.controlType;
				campaign.prompts[promptIndex].language = prompt.language;
				campaign.prompts[promptIndex].languageCode = prompt.languageCode;
				campaign.prompts[promptIndex].tenseId = prompt.tenseId;
				campaign.prompts[promptIndex].tense = prompt.tense;
				campaign.prompts[promptIndex].name = prompt.name;
				campaign.prompts[promptIndex].prompt = prompt.prompt;
				campaign.prompts[promptIndex].toneVoices = prompt.prompt.toneVoices;
			}

			$('#carousel_' + prompt.id + ' p').remove();
		}
	}
}
function updatePanelResult(prompt) {

	if (prompt.chatGptRolId == 2) {

		for (var i = 0; i < prompt.result.length > 0; i++) {

			var resultId = $('#carousel_' + prompt.id + ' .item.active p').data('resultid');

			var p = '<p id="carousel_' + prompt.id + '_' + i + '" data-resultId="' + prompt.result[i].id + '" data-promptId="' + prompt.id + '">' + prompt.result[i].response + '</p>';

			$('#carousel_' + prompt.id + ' .item').eq(i).append(p);
			//$('#carousel_' + prompt.id + '_' + i).text(prompt.result[i].response);


			var pElement = $('#carousel_' + prompt.id + '_' + i);
			updateResultFooterStats(prompt.id, i, pElement);
		}

		resultP = 0;
	}
}
function reinitPanelButtons() {

	var container = $('#promptContainer');

	var panelControl = {
		closeBtn: $('[data-dismiss="panel"], [data-panel="dismiss"]', container),
	}
	if (panelControl.closeBtn.length) {
		panelControl.closeBtn.one('click', function (e) {
			e.preventDefault();
			var el = $(this).closest('.panel', container);

			el.addClass('remove').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function (e) {
				if (e.originalEvent.propertyName == "opacity") {
					el.remove();
					$('body').removeClass('panel-fullscreen');
				}
			});
		});
	}
}

//SEO - Stats

//Modal - Prompts Logs 
function openSeoStats(promptId) {

	//$('.alert').hide('slow').removeClass('alert-success').removeClass('alert-danger');

	var statsChars = '';
	var statsSpaces = '';
	var statsWords = '';
	var statsSentences = '';
	var statsParagraphs = '';
	var statsAll = '';

	// reset modal body with a spinner or empty content
	$('#modal-loading').fadeIn();
	$(".modal-title", $ModalSeoStats).html("Result - SEO Stats");
	$ModalSeoStats.modal("show");

	var pId = 'carousel_';
	var text = '';

	if (resultP == 0)
		pId = pId + promptId + '_' + resultP;
	else
		pId = pId + resultP;

	text = $('#' + pId).text();

	$('#promptQuote', $ModalSeoStats).html(text);

	var getSeoStats = seoStats(text);

	var counterText = [];
	Countable.count(text, counter => { counterText = counter; });

	$('#characterTotal').html(counterText.characters);
	$('#spacesTotal').html(parseInt(counterText.all - counterText.characters));
	$('#wordsTotal').html(counterText.words);
	$('#sentencesTotal').html(counterText.sentences);
	$('#paragraphsTotal').html(counterText.paragraphs);
	$('#textTotal').html(counterText.all);

	$('#tbSeoStats tbody').empty();

	for (var i = 0; i < getSeoStats.length; i++) {
		//if (getSeoStats[i][2] > 0) {

		$('#tbSeoStats tbody').append(`
				<tr id="R${i + 1}">
					<td class="text-center">${i + 1}</td>
					<td>${getSeoStats[i][0]}</td>
					<td>${getSeoStats[i][1]}%</td>
					<td>${getSeoStats[i][2]}</td>
			   </tr>`
		);
		//}
	}

	$('#modal-loading').fadeOut();

}

//Modal - Prompts Logs 
function openPromptLogs(promptId) {

	// reset modal body with a spinner or empty content
	$('#modal-loading').fadeIn();
	$(".modal-title", $ModalPromptsLogs).html("Result Logs");
	$ModalPromptsLogs.modal("show");

	$('#modal-loading').fadeOut();
}

function seoStats(paragraph) {
	var keywords = extractKeywords(paragraph);
	const keywordDensities = calculateKeywordDensity(paragraph, keywords);

	return keywordDensities;

}
function extractKeywords(paragraph) {
	// Convert the paragraph to lowercase and split it into words
	//const words = paragraph.toLowerCase().split(/\W+/);
	const words = paragraph.replace(/[^\w\s]|_/g, "").split(/\s+/);


	// Define a list of common stop words to filter out
	const stopWords = getStopWords();

	// Count the frequency of each word
	const wordFrequency = {};
	words.forEach(word => {
		if (!stopWords.includes(word)) {
			if (wordFrequency[word]) {
				wordFrequency[word]++;
			} else {
				wordFrequency[word] = 1;
			}
		}
	});

	// Sort the words by frequency in descending order
	const sortedWords = Object.keys(wordFrequency).sort((a, b) => {
		return wordFrequency[b] - wordFrequency[a];
	});

	// Return the top 5 most frequent words as relevant keywords
	return sortedWords;
}
function clearParagraph(paragraph) {

	// Convert the paragraph to lowercase for case-insensitive matching
	var lowerCaseParagraph = paragraph.toLowerCase();
	lowerCaseParagraph = removeWordsFromParagraph(paragraph, getStopWords());

	return lowerCaseParagraph;
}
function calculateKeywordDensity(paragraph, keywords) {
	// Convert the paragraph to lowercase for case-insensitive matching
	var lowerCaseParagraph = paragraph.toLowerCase();

	lowerCaseParagraph = removeWordsFromParagraph(paragraph, getStopWords());

	// Remove punctuation and split the paragraph into an array of words
	const words = lowerCaseParagraph.replace(/[^\w\s]|_/g, "").split(/\s+/);

	// Count the total number of words in the paragraph
	const totalWords = words.length;

	// Initialize an object to store the keyword densities
	const keywordDensities = [];

	// Iterate over each keyword
	keywords.forEach(keyword => {

		if (keyword != '') {

			// Convert the keyword to lowercase for case-insensitive matching
			const lowerCaseKeyword = keyword.toLowerCase();

			// Calculate the number of occurrences of the keyword in the paragraph
			const keywordCount = (lowerCaseParagraph.match(new RegExp("\\b" + lowerCaseKeyword + "\\b", "g")) || []).length;

			// Calculate the keyword density as a percentage
			const density = (keywordCount / totalWords) * 100;

			// Round the density to two decimal places
			const roundedDensity = Math.round(density * 100) / 100;

			// Store the keyword and its density in the keywordDensities object
			//keywordDensities[keyword] = Math.round(roundedDensity);
			keywordDensities.push([keyword, Math.round(roundedDensity), keywordCount]);
		}
	});
	return keywordDensities;
}
function removeWordsFromParagraph(paragraph, wordsToRemove) {
	// Split the paragraph into individual words
	const words = paragraph.split(/\W+/);

	// Filter out the words to be removed
	const filteredWords = words.filter(word => !wordsToRemove.includes(word));

	// Join the filtered words back into a paragraph
	const filteredParagraph = filteredWords.join(' ');

	return filteredParagraph;
}
function getStopWords() {
	return [
		'a',
		'an',
		'and',
		'are',
		'as',
		'at',
		'be',
		'by',
		'for',
		'from',
		'has',
		'he',
		'in',
		'is',
		'it',
		'its',
		'of',
		'on',
		'that',
		'the',
		'to',
		'was',
		'were',
		'will',
		'with',
		'you'
	];
}

function enableFooterBar(id, name) {

	if (name == 'Result') {
		$('#promptFooter_' + id).hide();
		$('#resultFooter_' + id).show();
	}

	if (name == 'Prompt') {
		$('#resultFooter_' + id).hide();
		$('#promptFooter_' + id).show();
	}

}

function updateResultFooterStats(id, index, pElement) {

	var statsChars = '';
	var statsSpaces = '';
	var statsWords = '';
	var statsSentences = '';
	var statsParagraphs = '';
	var statsAll = '';


	if (resultP != id + '_' + index) {

		resultP = id + '_' + index;

		var paragraph = pElement.text();
		paragraph = clearParagraph(paragraph);

		var counterText = [];
		Countable.count(paragraph, counter => { counterText = counter; });

		$('.statsChars', '#resultFooter_' + id).text(counterText.characters);
		$('.statsSpaces', '#resultFooter_' + id).text(parseInt(counterText.all - counterText.characters));
		$('.statsWords', '#resultFooter_' + id).text(counterText.words);
		$('.statsSentences', '#resultFooter_' + id).text(counterText.sentences);
		$('.statsParagraphs', '#resultFooter_' + id).text(counterText.paragraphs);
		$('.statsAll', '#resultFooter_' + id).text(counterText.all);

	}
}

function parseErrorStringToJson(errorString) {
}
