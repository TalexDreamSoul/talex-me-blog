#include <bits/stdc++.h>

using namespace std;

int main()
{

  int num;
  scanf("%d", num);

  vector<int> arr(num, 1);

  for (int i = 2; i < num; i++)
  {
    arr[i] = arr[i - 1] + arr[i - 2];
  }

  cout << arr[num - 1];

  return 0;
}

