import mData from "./json/m.json";
import fData from "./json/f.json";
import uData from "./json/u.json";

/****************************************************************************/

interface NameFilters {
    /** Allow names that are exclusively masculine */
    m: boolean,
    /** Allow names that are exclusively feminine */
    f: boolean,
    /** Allow names that are both masculine and feminine */
    b: boolean,

    /** Minimum length */
    min?: number,
    /** Maximum length */
    max?: number,

    /** List of characters or substrings of names that must NOT be present */
    exclude?: string[],
    /** List of characters or substrings of names that MUST be present */
    include?: string[],
}
export const getNameList = ({
    m, f, b,
    min = -Infinity, max = Infinity,
    exclude = [],
    include = []
}: NameFilters): string[] => {

    const names = [
        ...(m ? mData : []),
        ...(f ? fData : []),
        ...(b ? uData : [])
    ].filter(name => (
        !include.some(str => !name.includes(str)) // Includes all the required strings
        && !exclude.some(str => name.includes(str)) // Doesn't have any excluded strings
        && name.length > min && name.length < max // Is within the length limits
    ));

    return names;

};