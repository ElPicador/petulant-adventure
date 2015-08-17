package elpicador;

import com.google.common.base.MoreObjects;

public class Pair<A, B> {

	public A a;
	public B b;

	public Pair(A a, B b) {
		this.a = a;
		this.b = b;
	}

	@Override
	public String toString() {
		return MoreObjects.toStringHelper(this)
						.add("a", a)
						.add("b", b)
						.toString();
	}
}
