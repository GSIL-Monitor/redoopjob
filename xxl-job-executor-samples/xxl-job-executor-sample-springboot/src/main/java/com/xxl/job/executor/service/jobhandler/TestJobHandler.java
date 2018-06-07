package com.xxl.job.executor.service.jobhandler;

import com.xxl.job.core.biz.model.ReturnT;
import com.xxl.job.core.handler.IJobHandler;
import com.xxl.job.core.handler.annotation.JobHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2018/5/30.
 */
@JobHandler("TestJobHandler")
@Service
public class TestJobHandler extends IJobHandler{


    @Value("${xxl.job.executor.port}")
    private  String port;
    @Override
    public ReturnT<String> execute(String param) throws Exception {

        System.out.println("===>>>>>>>>>>>>>>>>>>>>正在执行定时任务，端口号<<<<<<<<<<<<<<<<<<<"+port+">>>>>>>>>>>>>>>>>");

        return ReturnT.SUCCESS;
    }
}
