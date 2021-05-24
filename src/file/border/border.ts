// Note that the border type is identical in all places,
// regardless of where it's used like paragraph/table/etc.
// PageBorders are a superset, but we're not using any of those extras.
//
// http://officeopenxml.com/WPborders.php
// http://officeopenxml.com/WPtableBorders.php
// http://officeopenxml.com/WPtableCellProperties-Borders.php
// http://officeopenxml.com/WPsectionBorders.php
//
// This describes the CT_Border type.
// <xsd:complexType name="CT_Border">
//     <xsd:attribute name="val" type="ST_Border" use="required"/>
//     <xsd:attribute name="color" type="ST_HexColor" use="optional" default="auto"/>
//     <xsd:attribute name="themeColor" type="ST_ThemeColor" use="optional"/>
//     <xsd:attribute name="themeTint" type="ST_UcharHexNumber" use="optional"/>
//     <xsd:attribute name="themeShade" type="ST_UcharHexNumber" use="optional"/>
//     <xsd:attribute name="sz" type="ST_EighthPointMeasure" use="optional"/>
//     <xsd:attribute name="space" type="ST_PointMeasure" use="optional" default="0"/>
//     <xsd:attribute name="shadow" type="s:ST_OnOff" use="optional"/>
//     <xsd:attribute name="frame" type="s:ST_OnOff" use="optional"/>
// </xsd:complexType>
import { XmlAttributeComponent, XmlComponent } from "file/xml-components";
import { hexColorValue } from "../values";

export interface IBorderOptions {
    readonly style: BorderStyle;
    readonly color?: string;
    readonly size?: number;
    readonly space?: number;
}

export class BorderElement extends XmlComponent {
    constructor(elementName: string, { color, ...options }: IBorderOptions) {
        super(elementName);
        this.root.push(
            new TableBordersAttributes({
                ...options,
                color: color === undefined ? color : hexColorValue(color),
            }),
        );
    }
}

class TableBordersAttributes extends XmlAttributeComponent<IBorderOptions> {
    protected readonly xmlKeys = {
        style: "w:val",
        color: "w:color",
        size: "w:sz",
        space: "w:space",
    };
}

export enum BorderStyle {
    SINGLE = "single",
    DASH_DOT_STROKED = "dashDotStroked",
    DASHED = "dashed",
    DASH_SMALL_GAP = "dashSmallGap",
    DOT_DASH = "dotDash",
    DOT_DOT_DASH = "dotDotDash",
    DOTTED = "dotted",
    DOUBLE = "double",
    DOUBLE_WAVE = "doubleWave",
    INSET = "inset",
    NIL = "nil",
    NONE = "none",
    OUTSET = "outset",
    THICK = "thick",
    THICK_THIN_LARGE_GAP = "thickThinLargeGap",
    THICK_THIN_MEDIUM_GAP = "thickThinMediumGap",
    THICK_THIN_SMALL_GAP = "thickThinSmallGap",
    THIN_THICK_LARGE_GAP = "thinThickLargeGap",
    THIN_THICK_MEDIUM_GAP = "thinThickMediumGap",
    THIN_THICK_SMALL_GAP = "thinThickSmallGap",
    THIN_THICK_THIN_LARGE_GAP = "thinThickThinLargeGap",
    THIN_THICK_THIN_MEDIUM_GAP = "thinThickThinMediumGap",
    THIN_THICK_THIN_SMALL_GAP = "thinThickThinSmallGap",
    THREE_D_EMBOSS = "threeDEmboss",
    THREE_D_ENGRAVE = "threeDEngrave",
    TRIPLE = "triple",
    WAVE = "wave",
}
