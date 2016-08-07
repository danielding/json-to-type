
interface orderItemType {
   id: number;
   name: string;
   price: number;
}

interface userType {
   name: string;
   gender: string;
   age: number;
}

interface dataType {
   order: Array<orderItemType>;
   user: userType;
}

interface rootElementType {
   status: string;
   data: dataType;
}
