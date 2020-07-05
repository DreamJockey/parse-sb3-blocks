import {getMessageForLocale, getOptsForLocale} from '../block-mapping/block-mapping.js';

export default class Block {
    constructor (id, opcode, inputtables) {
        this.id = id;
        this.opcode = opcode;
        this.inputtables = inputtables || {};
    }

    blockSyntax (locale) {
        let syntax = getMessageForLocale(locale, this.opcode);
        return syntax.replace(
            /\({[\w-]\)}/g,
            (_, key) => this.inputtables[key].toScratchblocks(locale)
        );
    }

    useOptions (locale, opts) {
        opts = Object.assign({}, getOptsForLocale(locale, this.opcode), opts);
        let optionArray = [];
        if (opts.category) optionArray.push(opts.category);
        if (opts.type) optionArray.push(opts.type);
        if (optionArray.length) return `::${optionArray.join(' ')}`;
        return '';
    }

    toScratchblocks (locale, opts) {
        return `${this.blockSyntax(locale)}${this.useOptions(locale, opts)}`;
    }
}