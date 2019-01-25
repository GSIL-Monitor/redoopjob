package com.xxl.job.executor.service.jobhandler;

import com.xxl.job.core.handler.IJobHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.xxl.job.core.biz.model.ReturnT;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Random;

/**
 * @Author: admin
 * @Date :2018/12/14 18:24
 */
public class Tersrs extends IJobHandler {
    private static Logger logger = LoggerFactory.getLogger(Tersrs.class);
    @Override
    public ReturnT<String> execute(String param) throws Exception {

        logger.info("进入方法了。");
        String url = "jdbc:mysql://127.0.0.1:3306/aaa?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf8&autoReconnect=true&rewriteBatchedStatements=TRUE&useSSL=false";
        String user = "root";
        String password = "root";
        Connection connection =null;
        PreparedStatement preparedStatement =null;
        ResultSet rt = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection(url,user,password);
            String sql = "INSERT INTO java_user(name,sex,age,tel,time) VALUES(?,?,?,?,now())";
            preparedStatement = connection.prepareStatement(sql);

            connection.setAutoCommit(false);
            Long startTime = System.currentTimeMillis();



            for (int n = 1;n <= 1;n++){
                Random rand = new Random();

                for (int i = 1;i <=6;i++){
                    int a = rand.nextInt(20);
                    int b = rand.nextInt(10);
                    int c = rand.nextInt(10);
                    int d = rand.nextInt(10);

                    int upCase = rand.nextInt(26)+65;//得到65-90的随机数
                    int downCase = rand.nextInt(26)+97;//得到97-122的随机数
                    String up = String .valueOf((char)upCase);//得到A-Z
                    String down = String .valueOf((char)downCase);//得到a-z

                    preparedStatement.setString(1,up+down);
                    preparedStatement.setString(2,"男");
                    preparedStatement.setInt(3, a);
                    preparedStatement.setInt(4, a+5+b+c+2+d);
                    preparedStatement.addBatch();
                }
                preparedStatement.executeBatch();
                connection.commit();
                System.out.println("已经存入"+n*6+"条");
            }

            Long endTime = System.currentTimeMillis();
            System.out.println("用时"+(endTime-startTime));

        } catch(Exception e){
            e.printStackTrace();
            throw new RuntimeException(e);
        } finally{
            if(preparedStatement != null){
                try{
                    preparedStatement.close();
                } catch(Exception e){
                    e.printStackTrace();
                    throw new RuntimeException(e);
                }
            }
            if(connection != null){
                try{connection.close();
                } catch(Exception e){
                    e.printStackTrace();
                    throw new RuntimeException(e);
                }
            }
        }
    return ReturnT.SUCCESS;
    }
}
