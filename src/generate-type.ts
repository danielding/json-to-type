class GenerateType {
    private typeInterface = {};

    constructor (datasetName: string, private dataset: any) {
        this.generate('dataset', dataset);
    }

    public getResult() {
        let result = '';
        for (let item in this.typeInterface) {
            result += this.typeInterface[item];
        }

        return result;
    }
    private generate(datasetName: string, dataset: any) {
        let datasetResult = '';
        let datasetType = this.getObjectType(dataset);

        if (datasetType === 'object') {
            datasetResult += '\ninterface ' + datasetName + 'Type {\n';
            for (let key in dataset) {
                let valueType = this.getObjectType(dataset[key]);
                if (valueType === 'object') {
                    valueType = key + 'Type';
                    this.generate(key, dataset[key]);
                } else if (valueType === 'array') {
                    valueType = 'Array<' + key + 'ItemType>';
                    this.generate(key + 'Item', dataset[key][0]);
                }
                datasetResult += '   ' + key + ': ' + valueType + ';\n';
            }
            datasetResult += '}\n';
        } else if (datasetType === 'array') {

        }
        this.typeInterface[datasetName] = datasetResult;
    }

    private isArray(object) {
        return object && typeof object==='object' && Array == object.constructor;
    }

    private getObjectType(object) {
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


}

export default GenerateType;
