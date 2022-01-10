type Order = UniqueObj & {
  customerName: string;
  phoneNumber: string;
  email: string;
  orderDate: string;
  deadline: string;
  completionDate?: string;
  desc: string;
  done: boolean = false;
};
