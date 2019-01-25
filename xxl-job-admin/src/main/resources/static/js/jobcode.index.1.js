layui.use('form', function () {
    var form = layui.form;
    var layer = layui.layer;
    $(function () {

        // init code editor
        var codeEditor;

        function initIde(glueSource) {
            if (codeEditor == null) {
                codeEditor = CodeMirror(document.getElementById("ideWindow"), {
                    mode: ideMode,
                    lineNumbers: true,
                    matchBrackets: true,
                    value: glueSource
                });
            } else {
                codeEditor.setValue(glueSource);
            }
        }

        initIde($("#version_now").val());

        // code change
        $(".source_version").click(function () {
            var sourceId = $(this).attr('version');
            var temp = $("#" + sourceId).val();

            //codeEditor.setValue('');
            initIde(temp);
        });
        $(".add_event").click(function () {

            var add_event = parseInt($(this).attr("add_event"));
            var title = "";
            var html = "";
            switch (add_event) {
                case 0:
                    title = "数据抽取";
                    html = "<form class=\"layui-form\">" +
                        "        <div class=\"layui-form-item\">" +
                        "                <label class=\"layui-form-label\">任务名称</label>" +
                        "                <div class=\"layui-input-block\">" +
                        "                    <input type=\"text\" name=\"step_name\" lay-verify=\"step_name\" autocomplete=\"off\" placeholder=\"请输入名称\" class=\"layui-input\">" +
                        "                </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据库类型</label>" +
                        "            <!-- <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"db_type\" lay-verify=\"db_type\" autocomplete=\"off\" placeholder=\"\" class=\"layui-input\">" +
                        "            </div> -->" +

                        "            <div class=\"layui-input-block\">" +
                        "                    <select name=\"db_type\" lay-filter=\"aihao\">" +
                        "                      <option value=\"\">请选择</option>" +
                        "                      <option value=\"mysql\" selected=\"\">mysql</option>" +
                        "                      <option value=\"hive\">hive</option>" +
                        "                      <option value=\"hivecli\">hivecli</option>" +
                        "                      <option value=\"mapred\">mapred</option>" +
                        "                      <option value=\"shell\">shell</option>" +
                        "                    </select>" +
                        "                  </div>" +
                        "        </div>" +
                        "                <legend>数据库连接信息</legend>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据库地址</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"db_ip\" lay-verify=\"db_ip\" autocomplete=\"off\" placeholder=\"请输入数据库地址\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据库端口</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"db_port\" lay-verify=\"db_port\" autocomplete=\"off\" placeholder=\"请输入数据库端口\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据库用户名</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"db_user\" lay-verify=\"db_user\" autocomplete=\"off\" placeholder=\"请输入数据库用户名\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据库密码</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"db_passwd\" lay-verify=\"db_passwd\" autocomplete=\"off\" placeholder=\"请输入数据库密码\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据库库名</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"db_db\" lay-verify=\"db_db\" autocomplete=\"off\" placeholder=\"请输入数据库库名\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <legend>数据操作</legend>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据路径</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"db_datapath\" lay-verify=\"db_datapath\" autocomplete=\"off\" placeholder=\"mysql（db.table），hive/hivecli（db.table.partition），mapred/shell 数据输出路径\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">sql执行前操作</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"pre_sql\" lay-verify=\"pre_sql\" autocomplete=\"off\" placeholder=\"请输入sql执行前操作\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据输出后执行操作</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"post_sql\" lay-verify=\"post_sql\" autocomplete=\"off\" placeholder=\"请输入数据输出后执行操作\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +

                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据存储类型</label>" +
                        "            <div class=\"layui-input-inline\">" +
                        "                    <select name=\"data_save_type\">" +
                        "                      <option value=\"\">请选择</option>" +
                        "                      <optgroup label=\"mysql\">" +
                        "                        <option value=\"FakeOutput\">FakeOutput</option>" +
                        "                        <option value=\"SimpleOutput\" selected=\"\">SimpleOutput(默认)</option>" +
                        "                      </optgroup>" +
                        "                      <optgroup label=\"hive\">" +
                        "                        <option value=\"FakeOutput\">FakeOutput</option>" +
                        "                        <option value=\"SimpleOutput\">SimpleOutput</option>" +
                        "                        <option value=\"ConvertOutput\">ConvertOutput</option>" +
                        "                      </optgroup>" +
                        "                      <optgroup label=\"hivecli\">" +
                        "                            <option value=\"HivecliOutput\">HivecliOutput</option>" +
                        "                      </optgroup>" +
                        "                      <optgroup label=\"mapred\">" +
                        "                            <option value=\"MapredOutput\">MapredOutput</option>" +
                        "                      </optgroup>   " +
                        "                        <optgroup label=\"shell\">" +
                        "                            <option value=\"ShellSimpleOutput\">ShellSimpleOutput</option>" +
                        "                        </optgroup>" +
                        "                    </select>" +
                        "                  </div>" +
                        "                    <label>数据输出所使用的function，mysql支持（FakeOutput,SimpleOutput）,hive支持（FakeOutput,SimpleOutput,ConvertOutput），hivecli支持（HivecliOutput），mapred支持（MapredOutput），shell支持（ShellSimpleOutput）；FakeOutput不执行真正的数据输出操作</label>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">sql组装方式</label>" +

                        "            <div class=\"layui-input-inline\">" +
                        "                    <select name=\"sql_assemble\">" +
                        "                      <option value=\"\">请选择</option>" +
                        "                      <optgroup label=\"mysql,mapred,shell,hivecli\">" +
                        "                        <option value=\"SimpleAssemble\" selected=\"\" >SimpleAssemble(默认)</option>" +
                        "                      </optgroup>" +
                        "                      <optgroup label=\"hive\">" +
                        "                        <option value=\"SimpleAssemble\">SimpleAssemble</option>" +
                        "                        <option value=\"OptXmlAssemble\">OptXmlAssemble</option>" +
                        "                      </optgroup>" +
                        "                    </select>" +
                        "                  </div>" +
                        "                    <label>sql语句组装方法，mysql,mapred,shell,hivecli 支持 SimpleAssemble，hive支持SimpleAssemble和OptXmlAssemble（实现了OptXmlEtl的功能，需要使用ConvertOutput）</label>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">sql语句</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"sql\" lay-verify=\"sql\" autocomplete=\"off\" placeholder=\"请输入执行的sql语句或执行命令\" class=\"layui-input\">" +
                        "            </div>" +
                        "            <label>产生数据的sql语句，mysql是sql语句，hive/hivecli是hql语句，mapred是hadoop命令，shell是shell命令</label>" +
                        "        </div>" +
                        "<div class=\"layui-form-item\">" +
                        "    <div class=\"layui-input-block\">" +
                        "      <button class=\"layui-btn\" lay-submit=\"\" lay-filter=\"data_extraction\">立即提交</button>" +
                        "      <button type=\"reset\" class=\"layui-btn layui-btn-primary\">重置</button>" +
                        "    </div>" +
                        "  </div>"
                    "</form>";

                    break;
                case 1:
                    title = "数据清洗";
                    html = "<form class=\"layui-form\">" +
                       "<div class=\"layui-form-item\">" +
                        "                <label class=\"layui-form-label\">任务名称</label>" +
                        "                <div class=\"layui-input-block\">" +
                        "                    <input type=\"text\" name=\"step_name\" lay-verify=\"step_name\" autocomplete=\"off\" placeholder=\"请输入名称\" class=\"layui-input\">" +
                        "                </div>" +
                        "        </div>" +
                        "  " +
                        "        <legend>数据信息</legend>" +
                        "  " +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">作业名称</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"job_name\" lay-verify=\"job_name\" autocomplete=\"off\" placeholder=\"请输入作业名称\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">上级任务名称</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"step_name1\" lay-verify=\"step_name1\" autocomplete=\"off\" placeholder=\"请输入上级任务名称\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据域</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"data_field\" lay-verify=\"data_field\" autocomplete=\"off\" placeholder=\"请输入数据域\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>"+
                        "<div class=\"layui-form-item\">" +
                        "    <div class=\"layui-input-block\">" +
                        "      <button class=\"layui-btn\" lay-submit=\"\" lay-filter=\"data_cleaning\">立即提交</button>" +
                        "      <button type=\"reset\" class=\"layui-btn layui-btn-primary\">重置</button>" +
                        "    </div>" +
                        "  </div>"
                    "</form>";
                    break;
                case 2:
                    title = "数据存储";
                    html = "<form class=\"layui-form\">" +
                        "" +
                        "        <div class=\"layui-form-item\">" +
                        "                <label class=\"layui-form-label\">任务名称</label>" +
                        "                <div class=\"layui-input-block\">" +
                        "                    <input type=\"text\" name=\"step_name\" lay-verify=\"step_name\" autocomplete=\"off\" placeholder=\"请输入名称\" class=\"layui-input\">" +
                        "                </div>" +
                        "        </div>" +
                        "  " +
                        "        <legend>数据信息</legend>" +
                        "  " +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">作业名称</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"job_name\" lay-verify=\"job_name\" autocomplete=\"off\" placeholder=\"请输入作业名称\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">上级任务名称</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"step_name\" lay-verify=\"step_name\" autocomplete=\"off\" placeholder=\"请输入上级任务名称\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据域</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"data_field\" lay-verify=\"data_field\" autocomplete=\"off\" placeholder=\"请输入数据域\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <legend>数据库连接信息</legend>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据库类型</label>" +
                        "      " +
                        "" +
                        "            <div class=\"layui-input-block\">" +
                        "                    <select name=\"db_type\" lay-filter=\"aihao\">" +
                        "                      <option value=\"\">请选择</option>" +
                        "                      <option value=\"mysql\" selected=\"\">mysql</option>" +
                        "                      <option value=\"hive\">hive</option>" +
                        "                      <option value=\"hivecli\">hivecli</option>" +
                        "                      <option value=\"mapred\">mapred</option>" +
                        "                      <option value=\"shell\">shell</option>" +
                        "                    </select>" +
                        "                  </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据库地址</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"db_ip\" lay-verify=\"db_ip\" autocomplete=\"off\" placeholder=\"请输入数据库地址\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据库端口</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"db_port\" lay-verify=\"db_port\" autocomplete=\"off\" placeholder=\"请输入数据库端口\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据库用户名</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"db_user\" lay-verify=\"db_user\" autocomplete=\"off\" placeholder=\"请输入数据库用户名\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据库密码</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"db_passwd\" lay-verify=\"db_passwd\" autocomplete=\"off\" placeholder=\"请输入数据库密码\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据库库名</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"db_db\" lay-verify=\"db_db\" autocomplete=\"off\" placeholder=\"请输入数据库库名\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <legend>数据操作</legend>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据路径</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"db_path\" lay-verify=\"db_path\" autocomplete=\"off\" placeholder=\"mysql（db.table），hive/hivecli（db.table.partition），mapred/shell 数据输出路径\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">sql执行前操作</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"pre_sql\" lay-verify=\"pre_sql\" autocomplete=\"off\" placeholder=\"请输入sql执行前操作\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据输出后执行操作</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"post_sql\" lay-verify=\"post_sql\" autocomplete=\"off\" placeholder=\"请输入数据输出后执行操作\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据加载函数</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"data_load_type\" lay-verify=\"data_load_type\" autocomplete=\"off\" placeholder=\"请输入数据输出后执行操作\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>" +
                        "        <div class=\"layui-form-item\">" +
                        "            <label class=\"layui-form-label\">数据域</label>" +
                        "            <div class=\"layui-input-block\">" +
                        "                <input type=\"text\" name=\"data_field\" lay-verify=\"data_field\" autocomplete=\"off\" placeholder=\"请输入数据输出后执行操作\" class=\"layui-input\">" +
                        "            </div>" +
                        "        </div>"+
                        "<div class=\"layui-form-item\">" +
                        "    <div class=\"layui-input-block\">" +
                        "      <button class=\"layui-btn\" lay-submit=\"\" lay-filter=\"data_storage\">立即提交</button>" +
                        "      <button type=\"reset\" class=\"layui-btn layui-btn-primary\">重置</button>" +
                        "    </div>" +
                        "  </div>"
                    "</form>";
                    break;
            }


            layer.open({
                type: 1,
                title: title,
                shadeClose: true,
                shade: 0.8,
                skin: 'layui-layer-rim', //加上边框
                area: ['70%', '90%'], //宽高
                content: html,
            });
            form.render();

        });


        //监听提交数据抽取
        form.on('submit(data_extraction)', function (data) {
            var dataJson = data.field;

            var sqlConInfos = []
            var sqlConInfo = {};
            var extraction = {};
            extraction["etl_class_name"] = "ExtractionEtl";
            if (dataJson.step_name == "" || dataJson.step_name == null) {
                layer.alert("任务名称不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                extraction["step_name"] = dataJson.step_name;
            }
            if (dataJson.db_type == "" || dataJson.db_type == null) {
                layer.alert("数据库类型不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                extraction["db_type"] = dataJson.db_type;
            }


            //db_coninfo 信息
            if (dataJson.db_ip == "" || dataJson.db_ip == null) {
                layer.alert("数据库地址不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                sqlConInfo["db_ip"] = dataJson.db_ip;
            }
            if (dataJson.db_port == "" || dataJson.db_port == null) {
                layer.alert("数据库端口不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                sqlConInfo["db_port"] = dataJson.db_port;
            }
            if (dataJson.db_user == "" || dataJson.db_user == null) {
                layer.alert("数据库用户名不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                sqlConInfo["db_user"] = dataJson.db_user;
            }
            if (dataJson.db_passwd == "" || dataJson.db_passwd == null) {
                layer.alert("数据库密码不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                sqlConInfo["db_passwd"] = dataJson.db_passwd;
            }
            if (dataJson.db_db == "" || dataJson.db_db == null) {
                layer.alert("数据库库名不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                sqlConInfo["db_db"] = dataJson.db_db;
            }
            sqlConInfos.push(sqlConInfo);
            extraction["db_coninfo"] = sqlConInfos;


            if (dataJson.db_datapath == "" || dataJson.db_datapath == null) {
                layer.alert("数据路径不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                extraction["db_datapath"] = dataJson.db_datapath;
            }
            if (dataJson.pre_sql == "" || dataJson.pre_sql == null) {
                extraction["pre_sql"] = [];
            } else {
                var pre_sqls =[];
                pre_sqls.push(dataJson.post_sql);
                extraction["pre_sql"] = pre_sqls;
            }
            if (dataJson.post_sql == "" || dataJson.post_sql == null) {
                extraction["post_sql"] = [];
            } else {
                var postSqls =[];
                postSqls.push(dataJson.post_sql);
                extraction["post_sql"] = postSqls;
            }
            if (dataJson.data_save_type == "" || dataJson.data_save_type == null) {
                layer.alert("数据存储类型不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                extraction["data_save_type"] = dataJson.data_save_type;
            }
            if (dataJson.sql_assemble == "" || dataJson.sql_assemble == null) {
                layer.alert("sql组装方式不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                extraction["sql_assemble"] = dataJson.sql_assemble;
            }
            if (dataJson.sql == "" || dataJson.sql == null) {
                layer.alert("sql语句不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                extraction["sql"] = dataJson.sql;
            }



            layer.alert(JSON.stringify(extraction, null, "\n"), {
                title: '生成数据抽取模板'
            })
            return false;
        });
        //监听提交数据清洗
        form.on('submit(data_cleaning)', function (data) {

            var dataJson = data.field;
            var dataSources = []
            var dataSource = {};
            var cleaning = {};
            cleaning["etl_class_name"] = "TransformEtl";
            if (dataJson.step_name == "" || dataJson.step_name == null) {
                layer.alert("任务名称不可为空", {
                    title: '必填字段'
                })
                return false;
            }else{
                cleaning["step_name"] = dataJson.step_name;
            }
            if (dataJson.job_name == "" || dataJson.job_name == null) {
                layer.alert("作业名称不可为空", {
                    title: '必填字段'
                })
                return false;
            }else{

                dataSource["job_name"] = dataJson.job_name;
            }
            if (dataJson.step_name1 == "" || dataJson.step_name1 == null) {
                layer.alert("上级任务名称不可为空", {
                    title: '必填字段'
                })
                return false;
            }else{

                dataSource["step_name"] = dataJson.step_name1;
            }
            if (dataJson.data_field == "" || dataJson.data_field == null) {
                layer.alert("数据域不可为空", {
                    title: '必填字段'
                })
                return false;
            }else{
                dataSource["data_field"] = dataJson.data_field;
            }
            dataSources.push(dataSource)
            cleaning["data_source"]=dataSources;

            cleaning["data_transform_type"] = "SimpleTransform";

            layer.alert(JSON.stringify(cleaning), {
                title: '生成数据清洗模板'
            })
            return false;
        });
        //监听提交数据存储
        form.on('submit(data_storage)', function (data) {
            var dataJson = data.field;
            var dataSource = {};
            var sqlConInfos = [];
            var sqlConInfo = {};
            var storage = {};
            storage["etl_class_name"] = "TransformEtl";
            if (dataJson.step_name == "" || dataJson.step_name == null) {
                layer.alert("任务名称不可为空", {
                    title: '必填字段'
                })
                return false;
            }else{
            storage["step_name"] = dataJson.step_name;
            }

            if (dataJson.job_name == "" || dataJson.job_name == null) {
                layer.alert("作业名称不可为空", {
                    title: '必填字段'
                })
                return false;
            }else{

                dataSource["job_name"] = dataJson.job_name;
            }
            if (dataJson.step_name1 == "" || dataJson.step_name1 == null) {
                layer.alert("上级任务名称不可为空", {
                    title: '必填字段'
                })
                return false;
            }else{

                dataSource["step_name"] = dataJson.step_name1;
            }
            storage["data_source"]=dataSource;

            if (dataJson.db_type == "" || dataJson.db_type == null) {
                layer.alert("数据库类型不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                storage["db_type"] = dataJson.db_type;
            }

            //db_coninfo 信息
            if (dataJson.db_ip == "" || dataJson.db_ip == null) {
                layer.alert("数据库地址不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                sqlConInfo["db_ip"] = dataJson.db_ip;
            }
            if (dataJson.db_port == "" || dataJson.db_port == null) {
                layer.alert("数据库端口不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                sqlConInfo["db_port"] = dataJson.db_port;
            }
            if (dataJson.db_user == "" || dataJson.db_user == null) {
                layer.alert("数据库用户名不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                sqlConInfo["db_user"] = dataJson.db_user;
            }
            if (dataJson.db_passwd == "" || dataJson.db_passwd == null) {
                layer.alert("数据库密码不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                sqlConInfo["db_passwd"] = dataJson.db_passwd;
            }
            if (dataJson.db_db == "" || dataJson.db_db == null) {
                layer.alert("数据库库名不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                sqlConInfo["db_db"] = dataJson.db_db;
            }
            sqlConInfos.push(sqlConInfo);
            storage["db_coninfo"]=sqlConInfos;

            if (dataJson.db_datapath == "" || dataJson.db_datapath == null) {
                layer.alert("数据路径不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                storage["db_path"] = dataJson.db_datapath;
            }
            if (dataJson.pre_sql == "" || dataJson.pre_sql == null) {
                storage["pre_sql"] = [];
            } else {
                var pre_sqls =[];
                pre_sqls.push(dataJson.post_sql);
                storage["pre_sql"] = pre_sqls;
            }
            if (dataJson.post_sql == "" || dataJson.post_sql == null) {
                storage["post_sql"] = [];
            } else {
                var postSqls =[];
                postSqls.push(dataJson.post_sql);
                storage["post_sql"] = postSqls;
            }
            if (dataJson.data_load_type == "" || dataJson.data_load_type == null) {
                layer.alert("数据存储类型不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                storage["data_load_type"] = dataJson.data_load_type;
            }
            if (dataJson.data_field == "" || dataJson.data_field == null) {
                layer.alert("数据域不可为空", {
                    title: '必填字段'
                })
                return false;
            } else {
                storage["data_field"] = dataJson.data_field;
            }

            layer.alert(JSON.stringify(storage), {
                title: '生成数据存储模板'
            })
            return false;
        });


        // code source save
        $("#save").click(function () {
            $('#saveModal').modal({backdrop: false, keyboard: false}).modal('show');
        });

        $("#saveModal .ok").click(function () {

            var glueSource = codeEditor.getValue();
            var glueRemark = $("#glueRemark").val();

            if (!glueRemark) {
                layer.open({
                    title: I18n.system_tips,
                    btn: [I18n.system_ok],
                    content: I18n.system_please_input + I18n.jobinfo_glue_remark,
                    icon: '2'
                });
                return;
            }

            if (glueRemark.length < 4 || glueRemark.length > 100) {
                layer.open({
                    title: I18n.system_tips,
                    btn: [I18n.system_ok],
                    content: I18n.jobinfo_glue_remark_limit,
                    icon: '2'
                });
                return;
            }

            $.ajax({
                type: 'POST',
                url: base_url + '/jobcode/save',
                data: {
                    'id': id,
                    'glueSource': glueSource,
                    'glueRemark': glueRemark
                },
                dataType: "json",
                success: function (data) {
                    if (data.code == 200) {
                        layer.open({
                            title: I18n.system_tips,
                            btn: [I18n.system_ok],
                            content: (I18n.system_save + I18n.system_success),
                            icon: '1',
                            end: function (layero, index) {
                                //$(window).unbind('beforeunload');
                                window.location.reload();
                            }
                        });
                    } else {
                        layer.open({
                            title: I18n.system_tips,
                            btn: [I18n.system_ok],
                            content: (data.msg || (I18n.system_save + I18n.system_fail)),
                            icon: '2'
                        });
                    }
                }
            });

        });


        eChartWindowShow("circular");

        function eChartWindowShow(modelType) {
            var glueSource = codeEditor.getValue();
            // var jsonGlueSource = eval('(' +glueSource.split("EOF")[1].split("=")[1].replace(/\'/g,"\"")+ ')');
            // var jsonGlueSource = JSON.parse(glueSource.split("EOF")[1].split("=")[1].replace(/\'/g,"\""));
            var jsonGlueSource = glueSource.split("\n");
            // var jsonGlueSource = glueSource.split("/\n|\r\n/");
            var stepNames = new Array();
            var baseNames = new Array();
            var linkList = new Array();
            var jobName = "";
            var y = 200;
            for (var j = 0, len = jsonGlueSource.length; j < len; j++) {
                var glueSource = jsonGlueSource[j].trim();


                if ("job_name" == glueSource.substr(2, 8) || "job_name" == glueSource.substr(10, 8)) {
                    var jobNa = glueSource.substring(glueSource.length - 6, glueSource.length - 2);
                    if (jobName != jobNa) {
                        jobName = jobNa;
                        y += 150;
                    }
                }


                if ("step_name" == glueSource.substr(1, 9)) {
                    var ccc = glueSource.replace("step_name", "name");
                    var baseName = (ccc.split(":")[1].replace(/\'|\"|]|,/g, ""));
                    baseNames.push(baseName);
                    stepNames.push(JSON.parse("{\"name\":\"" + jobName + "_" + baseName + "\"}"));
                    // stepNames.push(JSON.parse("{\"name\":\""+jobName+"_"+baseName+"\",\"x\":"+(10*(j+1))+",\"y\":"+y+"}"));
                }


                //
                if (glueSource.search("data_source") != -1) {
                    var data_source = glueSource.split(",");
                    for (var k = 0, lenk = data_source.length; k < lenk; k++) {
                        var step_name = data_source[k].trim();
                        if (step_name.search("step_name") != -1) {
                            var link = JSON.parse("{\"source\":\"" + jobName + "_" + step_name.split(":")[1].replace(/\'|\"|]|:|}|,/g, "") + "\",\"target\":\"" + jobName + "_" + baseNames[baseNames.length - 1] + "\"}");
                            linkList.push(link);
                        }
                    }
                }

            }

            // console.log(stepNames)
            // console.log(linkList)
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('eChartWindow'));

            // 指定图表的配置项和数据
            option = {
                title: {
                    text: 'ETL流程图'
                },
                toolbox: {
                    show: true,
                    feature: {
                        myTool2:{
                            show: true,
                            title: '引力布局',
                            icon: 'image://\\static\\imges\\force.png',
                            onclick: function (){
                                eChartWindowShow("force");
                            }
                        },
                        myTool1:{
                            show: true,
                            title: '圆形',
                            icon: 'image://\\static\\imges\\circular.png',
                            onclick: function (){
                                eChartWindowShow("circular");
                            }
                        }

                    }
                },
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [
                    {
                        type: 'graph',
                        // layout: 'force',
                        layout: modelType,
                        symbolSize: 30,
                        focusNodeAdjacency: true,
                        roam: true,
                        force: {
                            repulsion: 300
                        },
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
});