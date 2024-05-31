import { Algorithms } from "../utils/enum";

export class TotpEntry {
    constructor(name, website, totpSecret, algorithm, digits) {
        this.name = name;
        this.website = website;
        this.totpSecret = totpSecret;
        this.algorithm = algorithm;
        this.digits = digits;
    }

    static empty() {
        return new TotpEntry("", "", "", Algorithms.SHA1, 6);
    }
}
