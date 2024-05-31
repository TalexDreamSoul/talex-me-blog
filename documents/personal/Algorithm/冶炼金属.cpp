#include <bits/stdc++.h>

using namespace std;

const int ARR_NUM = 1e4 + 10;

int A[ARR_NUM], B[ARR_NUM],N; 

bool val_min(int v) {
	for (int i = 0; i < N; ++i) {
		if (A[i] / v > B[i]) {
			return true;
		}
	}
	
	return false;
}

int main() {
	
	cin>>N;
	
	for (int i = 0; i < N; ++i) {
		cin>>A[i]>>B[i];
	} 
	
	int min = 0;
	int lp = 1, rp = ARR_NUM;
	while ( lp <= rp ) {
		int mid = (lp + rp) >> 1;
		
		if (val_min(mid)) {
			`
			lp = mid + 1;
		} else {
			min = mid;
			
			rp = mid - 1;	
		}
	}
	
	cout<<min;
	
	return 0;
}
