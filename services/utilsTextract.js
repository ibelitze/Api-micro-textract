const _ = require("lodash");


const getText = (result, blocksMap) => {
    let text = "";

    if (_.has(result, "Relationships")) {
        result.Relationships.forEach(relationship => {
            if (relationship.Type === "CHILD") {
                relationship.Ids.forEach(childId => {
                    const word = blocksMap[childId];
                    if (word.BlockType === "WORD") {
                        text += `${word.Text} `;
                    }
                    if (word.BlockType === "SELECTION_ELEMENT") {
                        if (word.SelectionStatus === "SELECTED") {
                            text += `X `;
                        }
                    }
                });
            }
        });
    }

  return text.trim();
};

const findValueBlock = (keyBlock, valueMap) => {
    let valueBlock;
    keyBlock.Relationships.forEach(relationship => {
        if (relationship.Type === "VALUE") {
            // eslint-disable-next-line array-callback-return
            relationship.Ids.every(valueId => {
                if (_.has(valueMap, valueId)) {
                    valueBlock = valueMap[valueId];
                    return false;
                }
            });
        }
    });

    return valueBlock;
};

const getKeyValueRelationship = (keyMap, valueMap, blockMap) => {
    const keyValues = {};
    const keyMapValues = _.values(keyMap);

    keyMapValues.forEach(keyMapValue => {
        const valueBlock = findValueBlock(keyMapValue, valueMap);
        const key = getText(keyMapValue, blockMap);
        const value = getText(valueBlock, blockMap);
        keyValues[key] = value;
    });

    return keyValues;
};

const getKeyValueMap = blocks => {
    const keyMap = {};
    const valueMap = {};
    const blockMap = {};

    let blockId;
    blocks.forEach(block => {
        blockId = block.Id;
        blockMap[blockId] = block;

        if (block.BlockType === "KEY_VALUE_SET") {
            if (_.includes(block.EntityTypes, "KEY")) {
                keyMap[blockId] = block;
            } else {
                valueMap[blockId] = block;
            }
        }
    });

    return { keyMap, valueMap, blockMap };
};


const extraerTexto = (data) => {
    let lineas = [];
    let palabras = [];

    data.Blocks.forEach((block) => {
        if (block.BlockType == "LINE") {
            lineas.push(block.Text);
        }
        else if (block.BlockType == "WORD") {
            palabras.push(block.Text);
        }
    });

    return {lineas, palabras};
}

module.exports = {
    getKeyValueMap,
    getKeyValueRelationship,
    extraerTexto
};

