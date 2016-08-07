class TypeGenerator {
    private typeInfo = {};  // output type info object
    private dataset: any;   // input json file

    constructor (datasetName: string, dataset: any) {
        this.dataset = dataset;
        this.generate(datasetName, dataset);
    }

    /**
     * join the type info for writing into file
     */
    public getResult() {
        let result = '';
        for (let item in this.typeInfo) {
            result += this.typeInfo[item];
        }

        return result;
    }

    /**
     * generate type interface
     */
    private generate(datasetName: string, dataset: any) {
        let tempStr = '';
        let type = this.getObjectType(dataset);

        if (type === 'object') {
            tempStr += '\ninterface ' + datasetName + 'Type {\n';
            for (let key in dataset) {
                let valueType = this.getObjectType(dataset[key]);

                if (valueType === 'object') {
                    valueType = key + 'Type';
                    this.generate(key, dataset[key]);
                } else if (valueType === 'array') {
                    let subValueType = this.getObjectType(dataset[key][0]);
                    if (subValueType === 'number' || subValueType === 'boolean' || subValueType === 'string') {
                        valueType = 'Array<' + subValueType + '>';
                    } else {
                        valueType = 'Array<' + key + 'ItemType>';
                        this.generate(key + 'Item', dataset[key][0]);
                    }
                }
                
                tempStr += '   ' + key + ': ' + valueType + ';\n';
            }
            tempStr += '}\n';
            
        } else if (type === 'array') {
            let type = this.getObjectType(dataset[0]);

            if (type === 'object') {
                this.generate(datasetName + 'Item', dataset[0]);
            } else {
                this.generate(datasetName + 'SubItem', dataset[0][0]);
            }

        }
        this.typeInfo[datasetName] = tempStr;
    }

    
    /**
     * get the target object's origin type
     */
    private getObjectType(object: Object) {
        let objectType = 'object';
        let typeOfResult = typeof object;
        switch (typeOfResult) {
            case 'number':
            case 'string':
            case 'boolean':
                objectType = typeOfResult;
                break;
            case 'object': 
                if (this.isArray(object)) {
                    objectType = 'array';
                }
            default:
                break;
        }

        return objectType;
    }

    /**
     * check whether the object is array
     */
    private isArray(object: Object) {
        return object && typeof object==='object' && Array == object.constructor;
    }
}

export default TypeGenerator;
