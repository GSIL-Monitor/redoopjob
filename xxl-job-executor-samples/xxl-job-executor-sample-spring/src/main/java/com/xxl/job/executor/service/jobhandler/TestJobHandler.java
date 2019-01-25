package com.xxl.job.executor.service.jobhandler;

import com.xxl.job.core.biz.model.ReturnT;
import com.xxl.job.core.handler.IJobHandler;
import com.xxl.job.core.handler.annotation.JobHandler;
import com.xxl.job.core.log.XxlJobLogger;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;


/**
* 任务Handler示例（Bean模式）
*
* 开发步骤：
* 1、继承"IJobHandler"：“com.xxl.job.core.handler.IJobHandler”；
* 2、注册到Spring容器：添加“@Component”注解，被Spring容器扫描为Bean实例；
* 3、注册到执行器工厂：添加“@JobHandler(value="自定义jobhandler名称")”注解，注解value值对应的是调度中心新建任务的JobHandler属性的值。
* 4、执行日志：需要通过 "XxlJobLogger.log" 打印执行日志；
*
* @author xuxueli 2015-12-19 19:43:36
*/

@JobHandler(value="test")
@Component
public class TestJobHandler extends IJobHandler {

	public static int total = 0;
	public static void swap(String[] str, int i, int j)
	{
		String temp = new String();
		temp = str[i];
		str[i] = str[j];
		str[j] = temp;
	}
	public static void arrange (String[] str, int st, int len) {
		if (st == len - 1)
		{
			for (int i = 0; i < len; i ++)
			{
				System.out.print(str[i]+ "  ");
			}
			System.out.println("+++测试运行没有运行++++");
			System.out.println();

			total++;
		}
		else
		{
			for (int i = st; i < len; i ++)
			{
				swap(str, st, i);
				arrange(str, st + 1, len);
				swap(str, st, i);
			}
		}

	}

	@Override
	public ReturnT<String> execute(String param) throws Exception {
		String str[] = {"a","b","c"};
		arrange(str, 0, str.length);
		System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<长度>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+total);

		XxlJobLogger.log("调度器执行成功了........");
		return SUCCESS;
	}
}
