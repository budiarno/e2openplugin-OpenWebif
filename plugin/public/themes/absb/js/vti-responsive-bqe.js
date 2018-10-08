!function(){var e=new function(){var l;return{showProviders:function(e){$("#sel0").show(),$("#btn-provider-add").show().prop("disabled",1!==l.cType),$("#provider").empty(),$.each(e,function(e,t){$("#provider").append(t)}),$("#provider").children().first().addClass("ui-selected"),l.changeProvider($("#provider").children().first().data("sref"),l.showChannels),l.setHover("#provider")},showChannels:function(e){$("#channels").empty(),$.each(e,function(e,t){$("#channels").append(t)}),l.setChannelButtons(),l.setHover("#channels")},showBouquets:function(e){$("#bql").empty(),$.each(e,function(e,t){$("#bql").append(t)}),$("#bql").children().first().addClass("ui-selected"),l.changeBouquet($("#bql").children().first().data("sref"),l.showBouquetChannels),l.setHover("#bql")},showBouquetChannels:function(e){$("#bqs").empty(),$.each(e,function(e,t){$("#bqs").append(t)}),l.setBouquetChannelButtons(),l.setHover("#bqs")},buildRefStr:function(e){var t;return t=0===l.Mode?"1:7:1:0:0:0:0:0:0:0:(type == 1) || (type == 17) || (type == 195) || (type == 25) || (type == 22) || (type == 31) || (type == 211) ":"1:7:2:0:0:0:0:0:0:0:(type == 2) ",0===e?(t+='FROM BOUQUET "bouquets.',t+=0===l.Mode?"tv":"radio",t+='" ORDER BY bouquet'):1===e?t+="FROM PROVIDERS ORDER BY name":2===e?t+="FROM SATELLITES ORDER BY satellitePosition":3===e&&(t+="ORDER BY name"),t},setTvRadioMode:function(e){var t=!1;e===l.Mode&&3!==e||(t=!0),l.Mode=1<e?0:e,0===l.cType?l.getSatellites(l.showProviders):1===l.cType?l.getProviders(l.showProviders):2===l.cType&&($("#sel0").hide(),l.getChannels(l.showChannels)),t&&l.getBouquets(l.showBouquets)},getSatellites:function(a){l.cType=0;var e=l.buildRefStr(2),t=0===l.Mode?"tv":"radio";$.ajax({url:"/api/getsatellites",dataType:"json",cache:!0,data:{sRef:e,stype:t,date:l.date},success:function(e){var n=[],t=e.satellites;$.each(t,function(e,t){var a=t.service,s=t.name;n.push($("<li/>",{data:{sref:a}}).html(s))}),a&&a(n)}})},getProviders:function(a){l.cType=1;var e=l.buildRefStr(1);$.ajax({url:"/api/getservices",dataType:"json",cache:!0,data:{sRef:e,date:l.date},success:function(e){var n=[],t=e.services;$.each(t,function(e,t){var a=t.servicereference,s=t.servicename;n.push($("<li/>",{data:{sref:a}}).html(s))}),a&&a(n)}})},getChannels:function(t){l.cType=2;var e=l.buildRefStr(3);$.ajax({url:"/api/getservices?sRef="+e,dataType:"json",cache:!0,data:{sRef:e,date:l.date},success:function(e){l.allChannelsCache=e.services,l.filterChannelsCache=e.services,l.fillChannels(t)}})},fillChannels:function(e){var i=[];$.each(l.filterChannelsCache,function(e,t){var a=t.servicereference,s=t.servicename,n=a.split(":")[2],o=s+'<span class="pull-right">'+(l.sType[n]||"")+'&nbsp;<span class="dd-icon-selected pull-left"><i class="material-icons material-icons-centered">done</i></span></span>';i.push($("<li/>",{data:{stype:n,sref:a}}).html(o))}),e&&e(i)},getBouquets:function(a){l.bqStartPositions={};var e=l.buildRefStr(0);$.ajax({url:"/bouqueteditor/api/getservices",dataType:"json",cache:!1,data:{sRef:e},success:function(e){var n=[],t=e.services;$.each(t,function(e,t){var a=t.servicereference,s=t.servicename;l.bqStartPositions[t.servicereference]=t.startpos,n.push($("<li/>",{data:{sref:a}}).html('<span class="handle dd-icon"><i class="material-icons material-icons-centered">list</i>&nbsp;</span>'+s+'<span class="dd-icon-selected pull-right"><i class="material-icons material-icons-centered">done</i></span></li>'))}),a&&a(n)}})},changeProvider:function(e,t){$.ajax({url:"/api/getservices",dataType:"json",cache:!0,data:{sRef:e,date:l.date},success:function(e){l.allChannelsCache=e.services,l.filterChannelsCache=e.services,l.fillChannels(t)}})},changeBouquet:function(e,a){var r=0;l.bqStartPositions[e]&&(r=l.bqStartPositions[e]),$.ajax({url:"/bouqueteditor/api/getservices",dataType:"json",cache:!1,data:{sRef:e},success:function(e){var i=[],t=e.services;$.each(t,function(e,t){var a=t.servicereference,s=1==t.ismarker?'<span style="float:right">(M)</span>':"",n=t.servicename,o=r+t.pos;2==t.ismarker&&(s='<span style="float:right">(S)</span>'),""!=(n=o.toString()+" - "+n)&&i.push($("<li/>",{data:{ismarker:t.ismarker,sref:a}}).html('<span class="handle dd-icon"><i class="material-icons material-icons-centered">list</i>&nbsp;</span>'+n+s+'<span class="dd-icon-selected pull-right"><i class="material-icons material-icons-centered">done</i></span></li>'))}),a&&a(i)}})},addProvider:function(){var e=$("#provider li.ui-selected").data("sref");$.ajax({url:"/bouqueteditor/api/addprovidertobouquetlist",dataType:"json",cache:!0,data:{sProviderRef:e,mode:l.Mode,date:l.date},success:function(e){var t=e.Result;2==t.length&&l.showError(t[1],t[0]),l.getBouquets(l.showBouquets)}})},moveBouquet:function(e){$.ajax({url:"/bouqueteditor/api/movebouquet",dataType:"json",cache:!1,data:{sBouquetRef:e.sBouquetRef,mode:e.mode,position:e.position},success:function(){}})},addBouquet:function(){swal({title:tstr_bqe_name_bouquet,text:"",type:"input",showCancelButton:!0,closeOnConfirm:!0,animation:"slide-from-top",inputValue:"",input:"text"},function(e){if(!1===e)return!1;e.length&&$.ajax({url:"/bouqueteditor/api/addbouquet",dataType:"json",cache:!1,data:{name:e,mode:l.Mode},success:function(e){var t=e.Result;2==t.length&&l.showError(t[1],t[0]),l.getBouquets(l.showBouquets)}})})},renameBouquet:function(){if(1===$("#bql li.ui-selected").length){var e=$("#bql li.ui-selected"),t=(e.index(),e.text()),a=$.trim(t.replace(/^list/,"").replace(/done$/,"")),s=e.data("sref");swal({title:tstr_bqe_rename_bouquet,text:"",type:"input",showCancelButton:!0,closeOnConfirm:!0,animation:"slide-from-top",inputValue:a,input:"text"},function(e){if(!1===e||e===t)return!1;e.length&&$.ajax({url:"/bouqueteditor/api/renameservice",dataType:"json",cache:!1,data:{sRef:s,mode:l.Mode,newName:e},success:function(e){var t=e.Result;2==t.length&&l.showError(t[1],t[0]),l.getBouquets(l.showBouquets)}})})}},deleteBouquet:function(){if(1===$("#bql li.ui-selected").length){var e=$("#bql li.ui-selected").text(),t=$("#bql li.ui-selected").data("sref");swal({title:tstr_bqe_del_bouquet_question,text:e.replace(/^list/,"").replace(/done$/,"")+" ?",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:tstrings_yes_delete+" !",cancelButtonText:tstrings_no_cancel+" !",closeOnConfirm:!0,closeOnCancel:!0},function(e){e&&$.ajax({url:"/bouqueteditor/api/removebouquet",dataType:"json",cache:!1,data:{sBouquetRef:t,mode:l.Mode},success:function(e){var t=e.Result;2==t.length&&l.showError(t[1],t[0]),l.getBouquets(l.showBouquets)}})})}},setChannelButtons:function(){var e=0==$("#channels li.ui-selected").length;$("#btn-channel-add").prop("disabled",e),$("#btn-alternative-add").prop("disabled",e)},setBouquetChannelButtons:function(){var e=$("#bqs li.ui-selected"),t=0==e.length;$("#btn-channel-delete").prop("disabled",t),$("#btn-marker-add").prop("disabled",t),$("#btn-spacer-add").prop("disabled",t),t=1!=e.length||1!=e.data("ismarker"),$("#btn-marker-group-rename").prop("disabled",t)},moveChannel:function(e){$.ajax({url:"/bouqueteditor/api/moveservice",dataType:"json",cache:!1,data:{sBouquetRef:e.sBouquetRef,sRef:e.sRef,mode:e.mode,position:e.position},success:l.renumberChannel})},renumberChannel:function(){},addChannel:function(){var e=[],t=$("#bql li.ui-selected").data("sref"),a=$("#bqs li.ui-selected").data("sref")||"";$("#channels li.ui-selected").each(function(){e.push($.ajax({url:"/bouqueteditor/api/addservicetobouquet",dataType:"json",cache:!1,data:{sBouquetRef:t,sRef:$(this).data("sref"),sRefBefore:a},success:function(){}}))}),0!==e.length&&$.when.apply($,e).then(function(){l.changeBouquet(t,l.showBouquetChannels)})},addAlternative:function(){alert("NOT implemented YET")},deleteChannel:function(){if(0!==$("#bqs li.ui-selected").length){var t=$("#bql li.ui-selected").data("sref"),e=[],a=[],s=[];$("#bqs li.ui-selected").each(function(){a.push($(this).text().replace(/^list/,"").replace(/done$/,"")),e.push($(this).text()),s.push({sBouquetRef:t,mode:l.Mode,sRef:$(this).data("sref")})}),swal({title:tstr_bqe_del_channel_question,text:a.join(", ")+" ?",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:tstrings_yes_delete+" !",cancelButtonText:tstrings_no_cancel+" !",closeOnConfirm:!0,closeOnCancel:!0},function(e){if(e){var a=[];$.each(s,function(e,t){a.push($.ajax({url:"/bouqueteditor/api/removeservice",dataType:"json",cache:!1,data:t,success:function(){}}))}),0!==a.length&&$.when.apply($,a).then(function(){l.changeBouquet(t,l.showBouquetChannels)})}})}},addMarker:function(){l._addMarker(!1)},addSpacer:function(){l._addMarker(!0)},_addMarker:function(n){n||swal({title:tstr_bqe_name_marker,text:"",type:"input",showCancelButton:!0,closeOnConfirm:!0,animation:"slide-from-top",inputValue:"",input:"text"},function(e){if(!1===e)return!1;if(e.length||n){var a=$("#bql li.ui-selected").data("sref"),t=$("#bqs li.ui-selected").data("sref")||"",s={sBouquetRef:a,Name:e,sRefBefore:t};n&&(s={sBouquetRef:a,SP:"1",sRefBefore:t}),$.ajax({url:"/bouqueteditor/api/addmarkertobouquet",dataType:"json",cache:!1,data:s,success:function(e){var t=e.Result;2==t.length&&l.showError(t[1],t[0]),l.changeBouquet(a,l.showBouquetChannels)}})}})},renameMarkerGroup:function(){var e=$("#bqs li.ui-selected");if(1===e.length&&0!=e.data("ismarker")){e.index();var t=e.text(),a=($.trim(t.replace(/^list/,"").replace(/done$/,"")),e.data("sref")),s=$("#bql li.ui-selected").data("sref"),n=$("#bqs li.ui-selected").next().data("sref")||"";swal({title:tstr_bqe_rename_marker,text:"",type:"input",showCancelButton:!0,closeOnConfirm:!0,animation:"slide-from-top",inputValue:"",input:"text"},function(e){if(!1===e||e===t)return!1;e.length&&$.ajax({url:"/bouqueteditor/api/renameservice",dataType:"json",cache:!1,data:{sBouquetRef:s,sRef:a,newName:e,sRefBefore:n},success:function(e){var t=e.Result;2==t.length&&l.showError(t[1],t[0]),l.changeBouquet(s,l.showBouquetChannels)}})})}},searchChannel:function(e){var a=e.toLowerCase();l.filterChannelsCache=[],$.each(l.allChannelsCache,function(e,t){-1!==t.servicename.toLowerCase().indexOf(a)&&l.filterChannelsCache.push({servicename:t.servicename,servicereference:t.servicereference})}),l.fillChannels(l.showChannels),l.setChannelButtons()},showError:function(e,t){t=void 0!==t?t:"False",$("#statustext").text(""),!0===t||"True"===t||"true"===t?($("#statusbox").removeClass("ui-state-error").addClass("ui-state-highlight"),$("#statusicon").removeClass("ui-icon-alert").addClass("ui-icon-info")):($("#statusbox").removeClass("ui-state-highlight").addClass("ui-state-error"),$("#statusicon").removeClass("ui-icon-info").addClass("ui-icon-alert")),$("#statustext").text(e),""!==e?$("#statuscont").show():$("#statuscont").hide()},exportBouquets:function(){var e=prompt(tstr_bqe_filename+": ","bouquets_backup");e&&$.ajax({url:"/bouqueteditor/api/backup",dataType:"json",cache:!1,data:{Filename:e},success:function(e){var t=e.Result;if(!1===t[0])showError(t[1],t[0]);else{var a="/bouqueteditor/tmp/"+t[1];window.open(a,"Download")}}})},importBouquets:function(){$("#rfile").trigger("click")},prepareRestore:function(){var e=$(this).val();e=e.replace("C:\\fakepath\\",""),!1!==confirm(tstr_bqe_restore_question+" ( "+e+") ?")&&($("form#uploadrestore").unbind("submit").submit(function(e){var t=new FormData(this);$.ajax({url:"/bouqueteditor/uploadrestore",type:"POST",data:t,mimeType:"multipart/form-data",contentType:!1,cache:!1,processData:!1,dataType:"json",success:function(e,t,a){var s=e.Result;s[0]?l.doRestore(s[1]):l.showError("Upload File: "+t)},error:function(e,t,a){l.showError("Upload File Error: "+a)}}),e.preventDefault();try{e.unbind()}catch(e){}}),$("form#uploadrestore").submit())},doRestore:function(e){e&&$.ajax({url:"/bouqueteditor/api/restore",dataType:"json",cache:!1,data:{Filename:e},success:function(e){var t=e.Result;2==t.length&&l.showError(t[1],t[0])}})},setup:function(){(l=this).Mode=0,l.cType=1,l.sType={1:"[SD]",16:"[SD4]",19:"[HD]","1F":"[UHD]",D3:"[OPT]"},l.hovercls=getHoverCls(),l.activecls=getActiveCls(),$("#btn-provider-add").click(l.addProvider),$("#btn-channel-add").click(l.addChannel),$("#btn-alternative-add").click(l.addAlternative),$("#btn-bouquet-add").click(l.addBouquet),$("#btn-bouquet-rename").click(l.renameBouquet),$("#btn-bouquet-delete").click(l.deleteBouquet),$("#btn-channel-delete").click(l.deleteChannel),$("#btn-marker-add").click(l.addMarker),$("#btn-spacer-add").click(l.addSpacer),$("#btn-marker-group-rename").click(l.renameMarkerGroup),$("#provider").selectable({selected:function(e,t){$(t.selected).addClass("ui-selected").siblings().removeClass("ui-selected"),l.changeProvider($(t.selected).data("sref"),l.showChannels)},classes:{"ui-selected":l.activecls}}),$("#channels").selectable({stop:l.setChannelButtons,classes:{"ui-selected":l.activecls}}),$("#bql").sortable({handle:".handle",stop:function(e,t){var a=$(t.item).data("sref"),s=t.item.index();l.moveBouquet({sBouquetRef:a,mode:l.Mode,position:s})}}).selectable({filter:"li",cancel:".handle",selected:function(e,t){$(t.selected).addClass("ui-selected").siblings().removeClass("ui-selected"),l.changeBouquet($(t.selected).data("sref"),l.showBouquetChannels)},classes:{"ui-selected":l.activecls}}),$("#bqs").sortable({handle:".handle",stop:function(e,t){var a=$("#bql li.ui-selected").data("sref"),s=$(t.item).data("sref"),n=t.item.index();l.moveChannel({sBouquetRef:a,sRef:s,mode:l.Mode,position:n})}}).selectable({filter:"li",cancel:".handle",stop:l.setBouquetChannelButtons,classes:{"ui-selected":l.activecls}}),$("#toolbar-choose-tv").click(function(){l.setTvRadioMode(0)}),$("#toolbar-choose-radio").click(function(){l.setTvRadioMode(1)}),$("#toolbar-choose-satellites").click(function(){l.getSatellites(l.showProviders)}),$("#toolbar-choose-providers").click(function(){l.getProviders(l.showProviders)}),$("#toolbar-choose-channels").click(function(){$("#sel0").hide(),$("#btn-provider-add").hide(),l.getChannels(l.showChannels)}),$("#toolbar-bouquets-reload").click(function(){l.getBouquets(l.showBouquets)}),$("#toolbar-bouquets-export").click(l.exportBouquets),$("#toolbar-bouquets-import").click(l.importBouquets),$("#searchch").focus(function(){"..."===$(this).val()&&$(this).val("")}).keyup(function(){$(this).data("val")!==this.value&&l.searchChannel(this.value),$(this).data("val",this.value)}).blur(function(){$(this).data("val",""),""===$(this).val()&&$(this).val("...")}),$("#rfile").change(l.prepareRestore),l.setTvRadioMode(3)},setHover:function(e){$(e+" li").hover(function(){$(this).addClass(l.hovercls)},function(){$(this).removeClass(l.hovercls)})}}},t=new Date;e.date=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate(),e.setup()}();