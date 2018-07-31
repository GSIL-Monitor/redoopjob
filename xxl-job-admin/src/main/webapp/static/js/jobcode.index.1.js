$(function() {

	// init code editor
	var codeEditor;
	function initIde(glueSource) {
		if (codeEditor == null) {
            codeEditor = CodeMirror(document.getElementById("ideWindow"), {
                mode : ideMode,
                lineNumbers : true,
                matchBrackets : true,
                value: glueSource
            });
		} else {
            codeEditor.setValue(glueSource);
		}
	}

	initIde($("#version_now").val());

	// code change
	$(".source_version").click(function(){
		var sourceId = $(this).attr('version');
		var temp = $( "#" + sourceId ).val();

		//codeEditor.setValue('');
		initIde(temp);
	});
    eChartWindowShow();
	// code source save
	$("#save").click(function() {
		$('#saveModal').modal({backdrop: false, keyboard: false}).modal('show');
	});

	$("#saveModal .ok").click(function() {

		var glueSource = codeEditor.getValue();
		var glueRemark = $("#glueRemark").val();
		
		if (!glueRemark) {
			layer.open({
				title: I18n.system_tips,
                btn: [ I18n.system_ok],
				content: I18n.system_please_input + I18n.jobinfo_glue_remark ,
				icon: '2'
			});
			return;
		}
		if (glueRemark.length <4 || glueRemark.length > 100) {
			layer.open({
				title: I18n.system_tips ,
                btn: [ I18n.system_ok ],
				content: I18n.jobinfo_glue_remark_limit ,
				icon: '2'
			});
			return;
		}

		$.ajax({
			type : 'POST',
			url : base_url + '/jobcode/save',
			data : {
				'id' : id,
				'glueSource' : glueSource,
				'glueRemark' : glueRemark
			},
			dataType : "json",
			success : function(data){
				if (data.code == 200) {
					layer.open({
						title: I18n.system_tips,
                        btn: [ I18n.system_ok ],
						content: (I18n.system_save + I18n.system_success) ,
						icon: '1',
						end: function(layero, index){
							//$(window).unbind('beforeunload');
							window.location.reload();
						}
					});
				} else {
					layer.open({
						title: I18n.system_tips,
                        btn: [ I18n.system_ok ],
						content: (data.msg || (I18n.system_save + I18n.system_fail) ),
						icon: '2'
					});
				}
			}
		});

	});
	
	// before upload
	/*$(window).bind('beforeunload',function(){
		return 'Glue尚未保存，确定离开Glue编辑器？';
	});*/


	function eChartWindowShow() {
        var glueSource = codeEditor.getValue();
       // var jsonGlueSource = eval('(' +glueSource.split("EOF")[1].split("=")[1].replace(/\'/g,"\"")+ ')');
       // var jsonGlueSource = JSON.parse(glueSource.split("EOF")[1].split("=")[1].replace(/\'/g,"\""));
       var jsonGlueSource = glueSource.split("\n");
       var dataSource = new Array();
       var stepNames = new Array();
       var baseNames = new Array();
       var linkList = new Array();
        for(var j = 0,len = jsonGlueSource.length; j < len; j++){
        	var glueSource = jsonGlueSource[j].trim();

            if("step_name"==glueSource.substr(1,9)){
                var ccc = glueSource.replace("step_name","name");
                baseNames.push((ccc.split(":")[1].replace(/\'|\"|]|,/g,"")));
                stepNames.push(JSON.parse("{"+ccc.replace(/\'/g,"\"")+"\"x\":"+(10*(j+1))+",\"y\":"+300+"}"));
            }


        	// debugger
        	if(glueSource.search("data_source") != -1){
        		var data_source = glueSource.split(",");
        		for(var k = 0,lenk = data_source.length; k < lenk; k++){
                    var step_name = data_source[k].trim();
        			if(step_name.search("step_name") != -1){
                        var link = JSON.parse("{\"source\":\""+step_name.split(":")[1].replace(/\'|\"|]|:|}|,/g,"")+"\",\"target\":\""+baseNames[baseNames.length-1]+"\"}");
                        linkList.push(link);
					}
				}
			}

        }
		debugger
        var nameStr ="{'name':'mysql_e_1',x:200,y:300},{'name':'transform1',x:310,y:300},{'name':'load1',x:360,y:300}";
        // var nameStr =stepNames.join(",")+"";
        // var linksStr =linkList.join(",")+"";
        var linksStr ="{source:\"mysql_e_1\",target:\"transform1\"},{source:\"transform1\",target:\"load1\"}";
		// console.log(stepNames)
		// console.log(linkList)
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('eChartWindow'));

        // 指定图表的配置项和数据
        option = {
            title: {
                text: 'Graph 简单示例'
            },
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series : [
                {
                    type: 'graph',
                    layout: 'none',
                    symbolSize: 50,
//            left: 50%,
//            width: 500,
//            height: 500,
                    roam: true,
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        normal: {
                            textStyle: {
                                fontSize: 20
                            }
                        }
                    },
                    data: stepNames,
                    // data: [{'name':'mysql_e_1',x:200,y:300},{'name':'transform1',x:310,y:300},{'name':'load1',x:360,y:300}],
                    // links: [],
                    links: linkList,
                    lineStyle: {
                        normal: {
                            opacity: 0.9,
                            width: 2,
                            curveness: 0
                        }
                    }
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

});
