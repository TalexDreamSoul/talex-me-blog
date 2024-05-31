#include <bits/stdc++.h>

using namespace std;

int main()
{

  int num;
  cin >> num;
  
  int arr[num + 5];
//  vector<int> arr(num);
  
  arr[0] = 1;
  arr[1] = 1;

  for (int i = 2; i < num; i++)
  {
    arr[i] = arr[i - 1] + arr[i - 2];
  }

  cout << arr[num - 1];

  return 0;
}
