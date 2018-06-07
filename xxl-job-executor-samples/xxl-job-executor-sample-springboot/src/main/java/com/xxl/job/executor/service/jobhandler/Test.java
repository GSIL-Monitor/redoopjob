package com.xxl.job.executor.service.jobhandler;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.xxl.job.core.biz.model.ReturnT;
import com.xxl.job.core.handler.IJobHandler;
import com.xxl.job.core.handler.annotation.JobHandler;
import org.codehaus.groovy.runtime.powerassert.SourceText;
import org.springframework.stereotype.Service;

import javax.sound.midi.Soundbank;

/**
 * Created by Administrator on 2018/5/31.
 */
@JobHandler(value="test")
@Service
public class Test extends IJobHandler {

    public static int total = 0;
    public static void swap(String[] str, int i, int j)
    {
        String temp = new String();
        temp = str[i];
        str[i] = str[j];
        str[j] = temp;
    }
    public static void arrange (String[] str, int st, int len)
    {
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

        return SUCCESS;
    }
}
