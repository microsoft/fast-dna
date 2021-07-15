import {
    ColorHSL,
    ColorHSV,
    ColorLAB,
    ColorLCH,
    ColorRGBA64,
    ColorXYZ,
    contrastRatio,
    hslToRGB,
    hsvToRGB,
    labToLCH,
    labToRGB,
    labToXYZ,
    lchToLAB,
    lchToRGB,
    rgbToHSL,
    rgbToHSV,
    rgbToLAB,
    rgbToLCH,
    rgbToRelativeLuminance,
    rgbToTemperature,
    rgbToXYZ,
    temperatureToRGB,
    xyzToLAB,
    xyzToRGB,
} from "../src";
import { testData } from "../testData";
const testPrecision = 4;
describe("Color converter functions", () => {
    test("rgbToRelativeLuminance", () => {
        function testColor(data) {
            const rgb = new ColorRGBA64(
                data.rgba.r,
                data.rgba.g,
                data.rgba.b,
                data.rgba.a
            );
            expect(rgbToRelativeLuminance(rgb)).toBeCloseTo(data.lum, testPrecision);
        }
        for (const data of testData.namedColors) {
            testColor(data);
        }
    });
    test("contrastRatio", () => {
        function testPair(data) {
            const bottom = new ColorRGBA64(
                data.bottom.r,
                data.bottom.g,
                data.bottom.b,
                data.bottom.a
            );
            const top = new ColorRGBA64(data.top.r, data.top.g, data.top.b, data.top.a);
            expect(contrastRatio(bottom, top)).toBeCloseTo(data.contrast, testPrecision);
        }
        for (const data of testData.colorPairs) {
            testPair(data);
        }
    });
    test("rgbToHSL", () => {
        function testColor(data) {
            const rgb = new ColorRGBA64(
                data.rgba.r,
                data.rgba.g,
                data.rgba.b,
                data.rgba.a
            );
            const hsl = rgbToHSL(rgb);
            expect(hsl.h).toBeCloseTo(data.hsl.h, testPrecision);
            expect(hsl.s).toBeCloseTo(data.hsl.s, testPrecision);
            expect(hsl.l).toBeCloseTo(data.hsl.l, testPrecision);
        }
        for (const data of testData.namedColors) {
            testColor(data);
        }
    });
    test("hslToRGB", () => {
        function testColor(data) {
            const hsl = new ColorHSL(data.hsl.h, data.hsl.s, data.hsl.l);
            const rgb = hslToRGB(hsl);
            expect(rgb.r).toBeCloseTo(data.rgba.r, testPrecision);
            expect(rgb.g).toBeCloseTo(data.rgba.g, testPrecision);
            expect(rgb.b).toBeCloseTo(data.rgba.b, testPrecision);
            expect(rgb.a).toBe(1);
        }
        for (const data of testData.namedColors) {
            testColor(data);
        }
    });
    test("rgbToHSV", () => {
        function testColor(data) {
            const rgb = new ColorRGBA64(
                data.rgba.r,
                data.rgba.g,
                data.rgba.b,
                data.rgba.a
            );
            const hsv = rgbToHSV(rgb);
            expect(hsv.h).toBeCloseTo(data.hsv.h, testPrecision);
            expect(hsv.s).toBeCloseTo(data.hsv.s, testPrecision);
            expect(hsv.v).toBeCloseTo(data.hsv.v, testPrecision);
        }
        for (const data of testData.namedColors) {
            testColor(data);
        }
    });
    test("hsvToRGB", () => {
        function testColor(data) {
            const hsv = new ColorHSV(data.hsv.h, data.hsv.s, data.hsv.v);
            const rgb = hsvToRGB(hsv);
            expect(rgb.r).toBeCloseTo(data.rgba.r, testPrecision);
            expect(rgb.g).toBeCloseTo(data.rgba.g, testPrecision);
            expect(rgb.b).toBeCloseTo(data.rgba.b, testPrecision);
            expect(rgb.a).toBe(1);
        }
        for (const data of testData.namedColors) {
            testColor(data);
        }
    });
    test("lchToLAB", () => {
        function testColor(data) {
            const lch = new ColorLCH(data.lch.l, data.lch.c, data.lch.h);
            const lab = lchToLAB(lch);
            expect(lab.l).toBeCloseTo(data.lchToLabResult.l, testPrecision);
            expect(lab.a).toBeCloseTo(data.lchToLabResult.a, testPrecision);
            expect(lab.b).toBeCloseTo(data.lchToLabResult.b, testPrecision);
        }
        for (const data of testData.namedColors) {
            testColor(data);
        }
    });
    test("labToLCH", () => {
        function testColor(data) {
            const lab = new ColorLAB(data.lab.l, data.lab.a, data.lab.b);
            const lch = labToLCH(lab);
            expect(lch.l).toBeCloseTo(data.labToLCHResult.l, testPrecision);
            expect(lch.c).toBeCloseTo(data.labToLCHResult.c, testPrecision);
            expect(lch.h).toBeCloseTo(data.labToLCHResult.h, testPrecision);
        }
        for (const data of testData.namedColors) {
            testColor(data);
        }
    });
    test("labToXYZ", () => {
        function testColor(data) {
            const lab = new ColorLAB(data.lab.l, data.lab.a, data.lab.b);
            const xyz = labToXYZ(lab);
            expect(xyz.x).toBeCloseTo(data.labToXYZResult.x, testPrecision);
            expect(xyz.y).toBeCloseTo(data.labToXYZResult.y, testPrecision);
            expect(xyz.z).toBeCloseTo(data.labToXYZResult.z, testPrecision);
        }
        for (const data of testData.namedColors) {
            testColor(data);
        }
    });
    test("xyzToLAB", () => {
        function testColor(data) {
            const xyz = new ColorXYZ(data.xyz.x, data.xyz.y, data.xyz.z);
            const lab = xyzToLAB(xyz);
            expect(lab.l).toBeCloseTo(data.xyzToLABResult.l, testPrecision);
            expect(lab.a).toBeCloseTo(data.xyzToLABResult.a, testPrecision);
            expect(lab.b).toBeCloseTo(data.xyzToLABResult.b, testPrecision);
        }
        for (const data of testData.namedColors) {
            testColor(data);
        }
    });
    test("rgbToXYZ", () => {
        function testColor(data) {
            const rgb = new ColorRGBA64(
                data.rgba.r,
                data.rgba.g,
                data.rgba.b,
                data.rgba.a
            );
            const xyz = rgbToXYZ(rgb);
            expect(xyz.x).toBeCloseTo(data.rgbToXYZResult.x, testPrecision);
            expect(xyz.y).toBeCloseTo(data.rgbToXYZResult.y, testPrecision);
            expect(xyz.z).toBeCloseTo(data.rgbToXYZResult.z, testPrecision);
        }
        for (const data of testData.namedColors) {
            testColor(data);
        }
    });
    test("xyzToRGB", () => {
        function testColor(data) {
            const xyz = new ColorXYZ(data.xyz.x, data.xyz.y, data.xyz.z);
            const rgb = xyzToRGB(xyz);
            expect(rgb.r).toBeCloseTo(data.xyzToRGBResult.r, testPrecision);
            expect(rgb.g).toBeCloseTo(data.xyzToRGBResult.g, testPrecision);
            expect(rgb.b).toBeCloseTo(data.xyzToRGBResult.b, testPrecision);
            expect(rgb.a).toBe(1);
        }
        for (const data of testData.namedColors) {
            testColor(data);
        }
    });
    test("rgbToLAB", () => {
        function testColor(data) {
            const rgb = new ColorRGBA64(
                data.rgba.r,
                data.rgba.g,
                data.rgba.b,
                data.rgba.a
            );
            const lab = rgbToLAB(rgb);
            expect(lab.l).toBeCloseTo(data.rgbToLABResult.l, testPrecision);
            expect(lab.a).toBeCloseTo(data.rgbToLABResult.a, testPrecision);
            expect(lab.b).toBeCloseTo(data.rgbToLABResult.b, testPrecision);
        }
        for (const data of testData.namedColors) {
            testColor(data);
        }
    });
    test("labToRGB", () => {
        function testColor(data) {
            const lab = new ColorLAB(data.lab.l, data.lab.a, data.lab.b);
            const rgb = labToRGB(lab);
            expect(rgb.r).toBeCloseTo(data.labToRGBResult.r, testPrecision);
            expect(rgb.g).toBeCloseTo(data.labToRGBResult.g, testPrecision);
            expect(rgb.b).toBeCloseTo(data.labToRGBResult.b, testPrecision);
            expect(rgb.a).toBe(1);
        }
        for (const data of testData.namedColors) {
            testColor(data);
        }
    });
    test("rgbToLCH", () => {
        function testColor(data) {
            const rgb = new ColorRGBA64(
                data.rgba.r,
                data.rgba.g,
                data.rgba.b,
                data.rgba.a
            );
            const lch = rgbToLCH(rgb);
            expect(lch.l).toBeCloseTo(data.rgbToLCHResult.l, testPrecision);
            expect(lch.c).toBeCloseTo(data.rgbToLCHResult.c, testPrecision);
            expect(lch.h).toBeCloseTo(data.rgbToLCHResult.h, testPrecision);
        }
        for (const data of testData.namedColors) {
            testColor(data);
        }
    });
    test("lchToRGB", () => {
        function testColor(data) {
            const lch = new ColorLCH(data.lch.l, data.lch.c, data.lch.h);
            const rgb = lchToRGB(lch);
            expect(rgb.r).toBeCloseTo(data.lchToRGBResult.r, testPrecision);
            expect(rgb.g).toBeCloseTo(data.lchToRGBResult.g, testPrecision);
            expect(rgb.b).toBeCloseTo(data.lchToRGBResult.b, testPrecision);
            expect(rgb.a).toBe(1);
        }
        for (const data of testData.namedColors) {
            testColor(data);
        }
    });
    test("temperatureToRGB", () => {
        function testColor(data) {
            const temp = data.temp;
            const rgb = temperatureToRGB(temp);
            expect(rgb.r).toBeCloseTo(data.rgba.r, testPrecision);
            expect(rgb.g).toBeCloseTo(data.rgba.g, testPrecision);
            expect(rgb.b).toBeCloseTo(data.rgba.b, testPrecision);
            expect(rgb.a).toBe(1);
        }
        for (const data of testData.temperatures) {
            testColor(data);
        }
    });
    test("rgbToTemperature", () => {
        function testColor(data) {
            const rgb = new ColorRGBA64(
                data.rgba.r,
                data.rgba.g,
                data.rgba.b,
                data.rgba.a
            );
            const temp = rgbToTemperature(rgb);
            expect(temp).toBeCloseTo(data.temp, testPrecision);
        }
        for (const data of testData.namedColors) {
            testColor(data);
        }
    });
});
