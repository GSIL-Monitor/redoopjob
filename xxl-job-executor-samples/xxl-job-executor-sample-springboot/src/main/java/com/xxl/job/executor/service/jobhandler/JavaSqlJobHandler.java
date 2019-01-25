package com.xxl.job.executor.service.jobhandler;

import com.xxl.job.core.biz.model.ReturnT;
import com.xxl.job.core.handler.IJobHandler;
import com.xxl.job.core.handler.annotation.JobHandler;
import com.xxl.job.core.log.XxlJobLogger;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.Random;
import java.util.concurrent.TimeUnit;


/**
 * 任务Handler示例（Bean模式）
 *
 * 开发步骤：
 * 1、继承"IJobHandler"：“com.xxl.job.core.handler.IJobHandler”；
 * 2、注册到Spring容器：添加“@Component”注解，被Spring容器扫描为Bean实例；
 * 3、注册到执行器工厂：添加“@JobHandler(value="自定义jobhandler名称")”注解，
 * 		注解value值对应的是调度中心新建任务的JobHandler属性的值。
 * 4、执行日志：需要通过 "XxlJobLogger.log" 打印执行日志；
 *
 * @author xuxueli 2015-12-19 19:43:36
 */
@JobHandler(value="javaSqlJobHandler")
@Component
public class JavaSqlJobHandler extends IJobHandler {

	@Override
	public ReturnT<String> execute(String param) throws Exception {
		 String url = "jdbc:mysql://127.0.0.1:3306/aaa?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf8&autoReconnect=true&rewriteBatchedStatements=TRUE&useSSL=false";
		 String user = "root";
		 String password = "root";

		Connection conn = null;
		PreparedStatement pstm = null;
		ResultSet rt = null;
		try{
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(url,user,password);
			String sql = "INSERT INTO java_user(name,sex,age,tel,time) VALUES(?,?,?,?,now())";
			pstm = conn.prepareStatement(sql);

			conn.setAutoCommit(false);
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

					pstm.setString(1,up+down);
					pstm.setString(2,"男");
					pstm.setInt(3, a);
					pstm.setInt(4, a+5+b+c+2+d);
					pstm.addBatch();
				}
				pstm.executeBatch();
				conn.commit();
				System.out.println("已经存入"+n*6+"条");
			}

			Long endTime = System.currentTimeMillis();
			System.out.println("用时"+(endTime-startTime));

		} catch(Exception e){
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally{
			if(pstm != null){
				try{
					pstm.close();
				} catch(SQLException e){
					e.printStackTrace();
					throw new RuntimeException(e);
				}
			}
			if(conn != null){
				try{conn.close();
				} catch(SQLException e){
					e.printStackTrace();
					throw new RuntimeException(e);
				}
			}
		}


		return SUCCESS;
	}

}
