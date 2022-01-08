type Order = UniqueObj & {
  customerName: string;
  phoneNumber: number;
  email: string;
  orderDate: string;
  deadline: string;
  desc: string;
  done: boolean = false;
};
