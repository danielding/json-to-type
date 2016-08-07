## Introduction

jsonToType is a VS Code extension which converts JSON to TypeScript interfaces.

## Example

1. input json

```javascript
{
    "status": "success",
    "data": {
        "order": [
            {
                "id": 1,
                "name": "test order 1",
                "price": 2.5
            },
            {
                "id": 2,
                "name": "test order 2",
                "price": 5.5
            }
        ],
        "user": {
            "name": "daniel ding",
            "gender": "Male",
            "age": 26
        }
    }
}
```

2. output `data-type.d.ts`

```typescript
interface rootElementType {
   status: string;
   data: dataType;
}

interface dataType {
   order: Array<orderItemType>;
   user: userType;
}

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
```

## Usage

1. Open a json file in VS Code
    > note: pls make sure it is in a project workspace and it is a valid json. check whether your json is valid in [jsonlint](http://jsonlint.com/)
2. Launch VS Code Quick Open (⌘+P), input `json to type`, and press enter.
3. You will find the output file `data-type.d.ts` in `{workspace}/typings` directory.
4. add Type into your project with `/// <reference path="{workspace}/typings/data-type.d.ts" />`, Now you can use the generated Type infomation in your project.

## Contributing

* Feel free to submit a comment or pull request if you find any bugs or want any new feature.
* To see a list of active issues, visit the [Issues section](https://github.com/danielding/json-to-type/issues) on github

## License

MIT-licensed

## Release Notes

### 0.0.1

initial release of basic function

### 0.0.2

add readme.md and github issue link

