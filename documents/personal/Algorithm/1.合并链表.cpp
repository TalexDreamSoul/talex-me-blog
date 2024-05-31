#include <bits/stdc++.h>

using namespace std;

struct Node
{
  int score;
  int id;

  Node *next;
};

void insert(Node *head, Node *insert)
{
  Node *temp = head;
  while (temp->next != NULL && temp->next->id < insert->id)
  {
    temp = temp->next;
  }

  insert->next = temp->next;
  temp->next = insert;
}

int main()
{
  // 读入N和M 分别表示a和b的数据
  int N, M;
  scanf("%d %d", &N, &M);

  // 先定义一个头结点，这样整个链表我们就都可以访问了
  Node *head = new Node;
  head->next = NULL;

  int i;
  for (i = 0; i < N + M; ++i)
  {
    Node *a = new Node;

    scanf("%d %d", &a->id, &a->score);

    // 初始化
    a->next = NULL;

    insert(head, a);
  }

  // 读入即合并结束，打印即可
  Node *cur = head->next;
  while (cur != NULL)
  {
    printf("%d %d\n", cur->id, cur->score);

    cur = cur->next;
  }

  return 0;
}