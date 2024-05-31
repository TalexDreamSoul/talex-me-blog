#include <bits/stdc++.h>

using namespace std;

string line;

string names[25] = {"jan", "feb", "mar", "apr", "may", "jun", "jly", "aug", "sep", "oct", "nov", "dec", "tam", "hel", "maa", "huh", "tou", "kes", "hei", "elo", "syy", "lok", "mer", "jou"};

void mars2Earth()
{
  int len = line.length();
  int num = 0;

  for (int i = 0; i < len;i+=4) {
    string _this = line.substr(i, i + 3);
    
    int j = 0;
    for ( ; j < 24; ++j ) {
    	if ( _this == names[j] ) break;
	}
	
	int ind = j + 1;
	
    if ( ind <= 12 ) {
    	num += ind;
	} else {
		num += (ind - 12) * 13;
	}
  }

  printf("%d\n", num);
}

void earth2Mars()
{
	int num = stoi(line);
	
	int rem = num / 13;
	if ( rem != 0 ) {
		num -= 13 * rem;
		cout<<names[rem + 11]<<" ";
	}
	
	int mod = num % 12;
	cout<<names[mod - 1]<<endl;
}

void process()
{
  char _letter = line[0];

  if (_letter >= '0' && _letter <= '9')
  {
    earth2Mars();
  }
  else
  {
    mars2Earth();
  }
}

int main()
{
	
  int n;
  cin >> n;
  getchar();

  for (int i = 0; i < n; ++i)
  {
    getline(cin, line);

    process();
  }

  return 0;
}