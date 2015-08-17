package elpicador;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class MultiTreeMap<K, V> {

	private final TreeMap<K, List<V>> treeMap;

	private int completeSize;

	public MultiTreeMap() {
		treeMap = new TreeMap<>();
		completeSize = 0;
	}

	public int size() {
		return completeSize;
	}

	public void put(K key, V value) {
		if (!treeMap.containsKey(key)) {
			treeMap.put(key, new ArrayList<>());
		}

		treeMap.get(key).add(value);

		completeSize += 1;
	}

	public Iterable<V> subMap(K from, boolean fromInclusive, K to, boolean toInclusive) {
		return treeMap
						.subMap(from, fromInclusive, to, toInclusive)
						.values()
						.stream()
						.flatMap(Collection::stream)
						.collect(Collectors.toList());
	}
}
