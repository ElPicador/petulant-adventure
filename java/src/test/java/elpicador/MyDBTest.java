package elpicador;

import org.assertj.core.groups.Tuple;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

public class MyDBTest {

	private static final SimpleDateFormat FORMATER = new SimpleDateFormat("yyyy-MM-dd");

	private Date startYear;
	private Date endYear;
	private Date startAugust;
	private Date endAugust;

	@Before
	public void before() throws ParseException {
		startYear = FORMATER.parse("2015-01-01");
		endYear = FORMATER.parse("2015-12-31");
		startAugust = FORMATER.parse("2015-08-01");
		endAugust = FORMATER.parse("2015-08-31");
	}

	@Test
	public void count() throws IOException, ParseException {
		MyDB myDb = MyDB.index(this.getClass().getResourceAsStream("/data/count.tsv"));

		assertThat(myDb.count(FORMATER.parse("2015-07-01"), FORMATER.parse("2015-08-04")))
						.isEqualTo(3);
	}

  @Test
	public void one_day() throws IOException, ParseException {
		MyDB myDb = MyDB.index(this.getClass().getResourceAsStream("/data/one_day.tsv"));

		assertThat(myDb.count(startYear, endYear)).isEqualTo(1);
		assertThat(myDb.count(startAugust, endAugust)).isEqualTo(1);
	}

	@Test
	public void two_days() throws IOException, ParseException {
		MyDB myDb = MyDB.index(this.getClass().getResourceAsStream("/data/two_days.tsv"));

		assertThat(myDb.count(startYear, endYear)).isEqualTo(1); //should be 1, but HLL
		assertThat(myDb.count(startAugust, endAugust)).isEqualTo(1);
	}

	@Test
	public void popular() throws IOException, ParseException {
		MyDB myDb = MyDB.index(this.getClass().getResourceAsStream("/data/popular.tsv"));

		assertThat(myDb.popular(startYear, endYear, 1))
			.extracting("a", "b")
			.containsExactly(
							Tuple.tuple(3, "request1")
			);

		assertThat(myDb.popular(startYear, endYear, 2))
						.extracting("a", "b")
						.containsExactly(
										Tuple.tuple(3, "request1"),
										Tuple.tuple(2, "request2")
						);

		assertThat(myDb.popular(startAugust, endAugust, 1))
						.extracting("a", "b")
						.containsExactly(
										Tuple.tuple(3, "request1")
						);

		assertThat(myDb.popular(startAugust, FORMATER.parse("2015-08-02"), 1))
						.extracting("a", "b")
						.containsExactly(
										Tuple.tuple(1, "request1")
						);
	}


}