package elpicador;

import com.google.common.hash.Hashing;
import com.gs.collections.api.bag.sorted.SortedBag;
import com.gs.collections.api.tuple.primitive.ObjectIntPair;
import com.gs.collections.impl.bag.sorted.mutable.TreeBag;
import net.agkn.hll.HLL;

import java.io.*;
import java.nio.charset.Charset;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MyDB {

	private MultiTreeMap<Date, String> multiTreeMap;

	private MyDB() {
		multiTreeMap = new MultiTreeMap<>();
	}

	public static MyDB index(InputStream stream) throws IOException, ParseException {
		MyDB myDb = new MyDB();

		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		long startIndexingTime = System.nanoTime();
		InputStreamReader isr = new InputStreamReader(stream, Charset.forName("UTF-8"));
		BufferedReader br = new BufferedReader(isr);

		int lines = 0;
		String line = br.readLine();
		while (line != null) {
			String[] columns = line.split("\t");
			Date date = formatter.parse(columns[0]);
			String query = columns[1];
			myDb.multiTreeMap.put(date, query);

			line = br.readLine();
			lines++;
		}

		long endIndexingTime = System.nanoTime();
		long duration = (endIndexingTime - startIndexingTime);
		System.out.println("Indexing duration : " + duration / 100000 / 1000. + "s");
		System.out.println("DB   line count : " + myDb.multiTreeMap.size());
		System.out.println("File line count : " + lines);

		return myDb;
	}

	private Iterable<String> iterate(Date from, Date to) {
		return multiTreeMap.subMap(from, true, to, false);
	}

	/**
	 *
	 * @param from inclusie start date
	 * @param to exclusive end Date
	 * @return distinct count on period
	 */
	public long count(Date from, Date to) {
		Iterable<String> iterable = iterate(from, to);

		final HLL hll = new HLL(8, 4);
		for (String query : iterable) {
			long hash = Hashing
							.murmur3_128()
							.newHasher(1000) //should be max length of query
							.putString(query, Charset.forName("UTF-8"))
							.hash()
							.asLong();

			hll.addRaw(hash);
		}

		return hll.cardinality();
	}


	/**
	 *
	 * @param from inclusie start date
	 * @param to exclusive end Date
	 * @param size number of results
	 * @return popular of period
	 */
	public List<Pair<Integer, String>> popular(Date from, Date to, int size) {
		SortedBag<String> sortedBag = TreeBag.newBag(iterate(from, to));

		List<Pair<Integer, String>> result = new ArrayList<>();
		for (ObjectIntPair<String> pair : sortedBag.topOccurrences(size)) {
			result.add(new Pair<>(pair.getTwo(), pair.getOne()));
		}

		//In case of equality in topOccurrences
		return result.subList(0, size);
	}

	public static void main(String args[]) throws IOException, ParseException {
		MyDB myDb = MyDB.index(new FileInputStream("../data/hn_logs.tsv"));

		SimpleDateFormat FORMATER = new SimpleDateFormat("yyyy-MM-dd");

		long startCountTime = System.nanoTime();
		System.out.println("Count : " + myDb.count(FORMATER.parse("2015-08-01"), FORMATER.parse("2015-08-02")));
		long startPopularTime = System.nanoTime();
		System.out.println("Popular : " + myDb.popular(FORMATER.parse("2015-08-02"), FORMATER.parse("2015-08-03"), 2));
		long endTime = System.nanoTime();

		System.out.println("Time count : "  + (startPopularTime - startCountTime) / 100000 / 1000. + "s");
		System.out.println("Time popular : " + (endTime - startPopularTime) / 100000 / 1000. + "s");
	}

}
