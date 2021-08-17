package app.core.job;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.core.entities.Coupon;
import app.core.repositories.CouponRepository;
@Component
public class DailyJob extends Thread {
	@Autowired
	CouponRepository couponRepository;
	private boolean monitor;

	public void startMonitor() {
		if (monitor == false)
			monitor = true;
		System.out.println("monitor active");

	}

	public void stopMonitor() {
		monitor = false;
		System.out.println("monitor has stopped");

	}

	public void run() {
		startMonitor();
		while (monitor) {
			try {
				Coupon coupon = couponRepository.findByEndDateBefore(LocalDate.now());
				if(coupon!=null)
				couponRepository.delete(coupon);
				Thread.sleep(86400000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
	}
}
