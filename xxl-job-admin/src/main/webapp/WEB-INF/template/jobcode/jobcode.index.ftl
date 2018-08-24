<!DOCTYPE html>
<html>
<head>
  	<#import "/common/common.macro.ftl" as netCommon>
	<@netCommon.commonStyle />
	<link rel="stylesheet" href="${request.contextPath}/static/plugins/codemirror/lib/codemirror.css">
	<link rel="stylesheet" href="${request.contextPath}/static/plugins/codemirror/addon/hint/show-hint.css">
	<link rel="stylesheet" href="${request.contextPath}/static/plugins/layui/css/layui.css" media="all">
    <title>${I18n.admin_name}</title>
	<style type="text/css">
		.CodeMirror {
      		font-size:16px;
            width: 50%;
      		height: 93%;
            position: absolute;
		}
        .eChartWindow{
            font-size:16px;
            width: 50%;
            height: 100%;
            position: absolute;
            left: 50%;
        }
        .layui-form-label{
            width: 140px;
        }
        .layui-input-block{
            margin-left: 140px;
        }
    </style>
</head>
<body class="skin-blue fixed layout-top-nav">

	<div class="wrapper">

        <header class="main-header">
            <nav class="navbar navbar-static-top">
                <div class="container">
					<#-- icon -->
                    <div class="navbar-header">
                        <a class="navbar-brand"><b>Web</b>IDE</a>
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                            <i class="fa fa-bars"></i>
                        </button>
                    </div>

                    <#-- left nav -->
                    <div class="collapse navbar-collapse pull-left" id="navbar-collapse">
                        <ul class="nav navbar-nav">
                            <li class="active" ><a href="javascript:;">
                                <span class="sr-only">(current)</span>
                                【<#list GlueTypeEnum as item><#if item == jobInfo.glueType>${item.desc}</#if></#list>】
                                ${jobInfo.jobDesc}
                            </a></li>
                        </ul>
                    </div>

					<#-- right nav -->
                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">添加节点<span class="caret"></span></a>
                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        <a href="javascript:;" class="add_event" add_event="0">
                                            数据抽取
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" class="add_event" add_event="1">
                                            数据清洗
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" class="add_event" add_event="2">
                                            数据存储
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">${I18n.jobinfo_glue_rollback} <span class="caret"></span></a>
                                <ul class="dropdown-menu" role="menu">
                                    <li <#if jobLogGlues?exists && jobLogGlues?size gt 0 >style="display: none;"</#if> >
                                        <a href="javascript:;" class="source_version" version="version_now" glueType="${jobInfo.glueType}" >
                                            <#list GlueTypeEnum as item><#if item == jobInfo.glueType>${item.desc}</#if></#list>： ${jobInfo.glueRemark}
                                        </a>
                                    </li>
                                    <textarea id="version_now" style="display:none;" >${jobInfo.glueSource}</textarea>
									<#if jobLogGlues?exists && jobLogGlues?size gt 0 >
										<#list jobLogGlues as glue>
                                            <li>
                                                <a href="javascript:;" class="source_version" version="version_${glue.id}" glueType="${glue.glueType}" >
                                                    <#list GlueTypeEnum as item><#if item == glue.glueType>${item.desc}</#if></#list>： ${glue.glueRemark}
                                                </a>
                                            </li>
                                            <textarea id="version_${glue.id}" style="display:none;" >${glue.glueSource}</textarea>
										</#list>
									</#if>
                                </ul>
                            </li>
                            <li id="save" >
								<a href="javascript:;" >
									<i class="fa fa-fw fa-save" ></i>
                                    ${I18n.system_save}
								</a>
							</li>
                        </ul>
                    </div>

                </div>
            </nav>
        </header>

        <!--EChar后增-->
		<div class="content-wrapper" id="ideWindow" style="min-height: 100%" >
            <#--<div id="eChartWindow" style="width: 400px;height:400px;"></div>-->
            <div id="eChartWindow" class="eChartWindow"></div>
        </div>

		<!-- footer -->
		<#--<@netCommon.commonFooter />-->
	</div>

    <!-- 保存.模态框 -->
    <div class="modal fade" id="saveModal" tabindex="-1" role="dialog"  aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" ><i class="fa fa-fw fa-save"></i>${I18n.system_save}</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal form" role="form" >
                        <div class="form-group">
                            <label for="lastname" class="col-sm-2 control-label">${I18n.jobinfo_glue_remark}<font color="red">*</font></label>
                            <div class="col-sm-10"><input type="text" class="form-control" id="glueRemark" placeholder="${I18n.system_please_input}${I18n.jobinfo_glue_remark}" maxlength="64" ></div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-6">
                                <button type="button" class="btn btn-primary ok" >${I18n.system_save}</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal">${I18n.system_cancel}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
	
<@netCommon.commonScript />


    <#assign glueTypeModeSrc = "${request.contextPath}/static/plugins/codemirror/mode/clike/clike.js" />
    <#assign glueTypeIdeMode = "text/x-java" />

    <#if jobInfo.glueType == "GLUE_GROOVY" >
        <#assign glueTypeModeSrc = "${request.contextPath}/static/plugins/codemirror/mode/clike/clike.js" />
        <#assign glueTypeIdeMode = "text/x-java" />
    <#elseif jobInfo.glueType == "GLUE_SHELL" >
        <#assign glueTypeModeSrc = "${request.contextPath}/static/plugins/codemirror/mode/shell/shell.js" />
        <#assign glueTypeIdeMode = "text/x-sh" />
    <#elseif jobInfo.glueType == "GLUE_PYTHON" >
        <#assign glueTypeModeSrc = "${request.contextPath}/static/plugins/codemirror/mode/python/python.js" />
        <#assign glueTypeIdeMode = "text/x-python" />
    <#elseif jobInfo.glueType == "GLUE_NODEJS" >
        <#assign glueTypeModeSrc = "${request.contextPath}/static/plugins/codemirror/mode/javascript/javascript.js" />
        <#assign glueTypeIdeMode = "text/javascript" />
    </#if>


<script src="${request.contextPath}/static/js/echarts.min.js"></script>
<script src="${request.contextPath}/static/plugins/layui/layui.all.js"></script>
<#--<script src="${request.contextPath}/static/plugins/layer/layer.js"></script>-->
<script src="${request.contextPath}/static/plugins/codemirror/lib/codemirror.js"></script>
<script src="${glueTypeModeSrc}"></script>
<script src="${request.contextPath}/static/plugins/codemirror/addon/hint/show-hint.js"></script>
<script src="${request.contextPath}/static/plugins/codemirror/addon/hint/anyword-hint.js"></script>

<script>
var id = '${jobInfo.id}';
var ideMode = '${glueTypeIdeMode}';
</script>
<script src="${request.contextPath}/static/js/jobcode.index.1.js"></script>

</body>
</html>
