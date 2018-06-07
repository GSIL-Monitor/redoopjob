package com.xxl.job.executor.service.jobhandler;

import com.xxl.job.core.biz.model.ReturnT;
import com.xxl.job.core.handler.IJobHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by Administrator on 2018/5/29.
 */
public class DemoGlueHandler extends IJobHandler{


    private  static  transient Logger logger = LoggerFactory.getLogger(DemoGlueHandler.class);


    @Override
    public ReturnT<String> execute(String param) throws Exception {

        logger.info("LOG.....调度成功....");

        return ReturnT.SUCCESS;
    }


}
