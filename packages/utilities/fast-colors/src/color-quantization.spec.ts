import { test200ImageData } from "./__test__/test200.js";
import { testGrey200ImageData } from "./__test__/testGrey200.js";
import { ArrayPixelBlob } from "./array-pixel-blob.js";
import { quantize, QuantizedColor } from "./color-quantization.js";
import chai from "chai";
import { test } from "mocha";
const expect = chai.expect;

describe("Generating a histogram from an image", (): void => {
    test("quantize with default settings", () => {
        const pixels: ArrayPixelBlob = new ArrayPixelBlob(test200ImageData, 200, 133);

        const results: QuantizedColor[] = quantize(pixels);

        expect(results.length).to.equal(64);
        expect(results[0].color.toStringHexRGB()).to.equal("#8f98a7");
        expect(results[0].pixelCount).to.equal(93);
        expect(results[0].colorVolume).to.equal(245);
        expect(results[1].color.toStringHexRGB()).to.equal("#094b58");
        expect(results[1].pixelCount).to.equal(271);
        expect(results[1].colorVolume).to.equal(80);
        expect(results[2].color.toStringHexRGB()).to.equal("#e7b8b3");
        expect(results[2].pixelCount).to.equal(142);
        expect(results[2].colorVolume).to.equal(144);
        expect(results[3].color.toStringHexRGB()).to.equal("#bfc2cd");
        expect(results[3].pixelCount).to.equal(252);
        expect(results[3].colorVolume).to.equal(80);
        expect(results[4].color.toStringHexRGB()).to.equal("#b87264");
        expect(results[4].pixelCount).to.equal(131);
        expect(results[4].colorVolume).to.equal(150);
        expect(results[5].color.toStringHexRGB()).to.equal("#594747");
        expect(results[5].pixelCount).to.equal(240);
        expect(results[5].colorVolume).to.equal(80);
        expect(results[6].color.toStringHexRGB()).to.equal("#5f6f7a");
        expect(results[6].pixelCount).to.equal(113);
        expect(results[6].colorVolume).to.equal(144);
        expect(results[7].color.toStringHexRGB()).to.equal("#7b5453");
        expect(results[7].pixelCount).to.equal(268);
        expect(results[7].colorVolume).to.equal(60);
        expect(results[8].color.toStringHexRGB()).to.equal("#b58b89");
        expect(results[8].pixelCount).to.equal(124);
        expect(results[8].colorVolume).to.equal(126);
        expect(results[9].color.toStringHexRGB()).to.equal("#ac5c4d");
        expect(results[9].pixelCount).to.equal(6);
        expect(results[9].colorVolume).to.equal(2299);
        expect(results[10].color.toStringHexRGB()).to.equal("#8e7d84");
        expect(results[10].pixelCount).to.equal(162);
        expect(results[10].colorVolume).to.equal(84);
        expect(results[11].color.toStringHexRGB()).to.equal("#538ba1");
        expect(results[11].pixelCount).to.equal(44);
        expect(results[11].colorVolume).to.equal(297);
        expect(results[12].color.toStringHexRGB()).to.equal("#3c322f");
        expect(results[12].pixelCount).to.equal(276);
        expect(results[12].colorVolume).to.equal(45);
        expect(results[13].color.toStringHexRGB()).to.equal("#2e4443");
        expect(results[13].pixelCount).to.equal(37);
        expect(results[13].colorVolume).to.equal(324);
        expect(results[14].color.toStringHexRGB()).to.equal("#105e6e");
        expect(results[14].pixelCount).to.equal(188);
        expect(results[14].colorVolume).to.equal(60);
        expect(results[15].color.toStringHexRGB()).to.equal("#5f6463");
        expect(results[15].pixelCount).to.equal(12);
        expect(results[15].colorVolume).to.equal(910);
        expect(results[16].color.toStringHexRGB()).to.equal("#9d7670");
        expect(results[16].pixelCount).to.equal(64);
        expect(results[16].colorVolume).to.equal(168);
        expect(results[17].color.toStringHexRGB()).to.equal("#de9d97");
        expect(results[17].pixelCount).to.equal(179);
        expect(results[17].colorVolume).to.equal(60);
        expect(results[18].color.toStringHexRGB()).to.equal("#083c4c");
        expect(results[18].pixelCount).to.equal(41);
        expect(results[18].colorVolume).to.equal(252);
        expect(results[19].color.toStringHexRGB()).to.equal("#446875");
        expect(results[19].pixelCount).to.equal(90);
        expect(results[19].colorVolume).to.equal(108);
        expect(results[20].color.toStringHexRGB()).to.equal("#3b4f57");
        expect(results[20].pixelCount).to.equal(136);
        expect(results[20].colorVolume).to.equal(64);
        expect(results[21].color.toStringHexRGB()).to.equal("#c89089");
        expect(results[21].pixelCount).to.equal(72);
        expect(results[21].colorVolume).to.equal(112);
        expect(results[22].color.toStringHexRGB()).to.equal("#06343c");
        expect(results[22].pixelCount).to.equal(297);
        expect(results[22].colorVolume).to.equal(27);
        expect(results[23].color.toStringHexRGB()).to.equal("#202727");
        expect(results[23].pixelCount).to.equal(151);
        expect(results[23].colorVolume).to.equal(50);
        expect(results[24].color.toStringHexRGB()).to.equal("#e36a27");
        expect(results[24].pixelCount).to.equal(19);
        expect(results[24].colorVolume).to.equal(396);
        expect(results[25].color.toStringHexRGB()).to.equal("#9f8c8c");
        expect(results[25].pixelCount).to.equal(5);
        expect(results[25].colorVolume).to.equal(1440);
        expect(results[26].color.toStringHexRGB()).to.equal("#804734");
        expect(results[26].pixelCount).to.equal(9);
        expect(results[26].colorVolume).to.equal(784);
        expect(results[27].color.toStringHexRGB()).to.equal("#faad94");
        expect(results[27].pixelCount).to.equal(113);
        expect(results[27].colorVolume).to.equal(60);
        expect(results[28].color.toStringHexRGB()).to.equal("#a0635b");
        expect(results[28].pixelCount).to.equal(89);
        expect(results[28].colorVolume).to.equal(72);
        expect(results[29].color.toStringHexRGB()).to.equal("#b0543b");
        expect(results[29].pixelCount).to.equal(6);
        expect(results[29].colorVolume).to.equal(990);
        expect(results[30].color.toStringHexRGB()).to.equal("#503a32");
        expect(results[30].pixelCount).to.equal(92);
        expect(results[30].colorVolume).to.equal(60);
        expect(results[31].color.toStringHexRGB()).to.equal("#306371");
        expect(results[31].pixelCount).to.equal(71);
        expect(results[31].colorVolume).to.equal(72);
        expect(results[32].color.toStringHexRGB()).to.equal("#8f6a6d");
        expect(results[32].pixelCount).to.equal(59);
        expect(results[32].colorVolume).to.equal(84);
        expect(results[33].color.toStringHexRGB()).to.equal("#595960");
        expect(results[33].pixelCount).to.equal(92);
        expect(results[33].colorVolume).to.equal(50);
        expect(results[34].color.toStringHexRGB()).to.equal("#8a655f");
        expect(results[34].pixelCount).to.equal(74);
        expect(results[34].colorVolume).to.equal(60);
        expect(results[35].color.toStringHexRGB()).to.equal("#352424");
        expect(results[35].pixelCount).to.equal(69);
        expect(results[35].colorVolume).to.equal(60);
        expect(results[36].color.toStringHexRGB()).to.equal("#b57a76");
        expect(results[36].pixelCount).to.equal(40);
        expect(results[36].colorVolume).to.equal(88);
        expect(results[37].color.toStringHexRGB()).to.equal("#b7b4c4");
        expect(results[37].pixelCount).to.equal(17);
        expect(results[37].colorVolume).to.equal(196);
        expect(results[38].color.toStringHexRGB()).to.equal("#ac7c84");
        expect(results[38].pixelCount).to.equal(6);
        expect(results[38].colorVolume).to.equal(528);
        expect(results[39].color.toStringHexRGB()).to.equal("#fba078");
        expect(results[39].pixelCount).to.equal(41);
        expect(results[39].colorVolume).to.equal(72);
        expect(results[40].color.toStringHexRGB()).to.equal("#8f5753");
        expect(results[40].pixelCount).to.equal(63);
        expect(results[40].colorVolume).to.equal(40);
        expect(results[41].color.toStringHexRGB()).to.equal("#1b1c15");
        expect(results[41].pixelCount).to.equal(205);
        expect(results[41].colorVolume).to.equal(12);
        expect(results[42].color.toStringHexRGB()).to.equal("#2c201b");
        expect(results[42].pixelCount).to.equal(111);
        expect(results[42].colorVolume).to.equal(20);
        expect(results[43].color.toStringHexRGB()).to.equal("#d88b7f");
        expect(results[43].pixelCount).to.equal(25);
        expect(results[43].colorVolume).to.equal(84);
        expect(results[44].color.toStringHexRGB()).to.equal("#688ca0");
        expect(results[44].pixelCount).to.equal(16);
        expect(results[44].colorVolume).to.equal(126);
        expect(results[45].color.toStringHexRGB()).to.equal("#a3b4c4");
        expect(results[45].pixelCount).to.equal(9);
        expect(results[45].colorVolume).to.equal(196);
        expect(results[46].color.toStringHexRGB()).to.equal("#16160c");
        expect(results[46].pixelCount).to.equal(92);
        expect(results[46].colorVolume).to.equal(18);
        expect(results[47].color.toStringHexRGB()).to.equal("#6c4d4b");
        expect(results[47].pixelCount).to.equal(79);
        expect(results[47].colorVolume).to.equal(20);
        expect(results[48].color.toStringHexRGB()).to.equal("#d6bfc5");
        expect(results[48].pixelCount).to.equal(49);
        expect(results[48].colorVolume).to.equal(32);
        expect(results[49].color.toStringHexRGB()).to.equal("#24363a");
        expect(results[49].pixelCount).to.equal(58);
        expect(results[49].colorVolume).to.equal(27);
        expect(results[50].color.toStringHexRGB()).to.equal("#e5c4bc");
        expect(results[50].pixelCount).to.equal(6);
        expect(results[50].colorVolume).to.equal(240);
        expect(results[51].color.toStringHexRGB()).to.equal("#35241c");
        expect(results[51].pixelCount).to.equal(17);
        expect(results[51].colorVolume).to.equal(84);
        expect(results[52].color.toStringHexRGB()).to.equal("#ed8a65");
        expect(results[52].pixelCount).to.equal(7);
        expect(results[52].colorVolume).to.equal(200);
        expect(results[53].color.toStringHexRGB()).to.equal("#8c8c94");
        expect(results[53].pixelCount).to.equal(16);
        expect(results[53].colorVolume).to.equal(80);
        expect(results[54].color.toStringHexRGB()).to.equal("#04232a");
        expect(results[54].pixelCount).to.equal(41);
        expect(results[54].colorVolume).to.equal(30);
        expect(results[55].color.toStringHexRGB()).to.equal("#e3aca3");
        expect(results[55].pixelCount).to.equal(18);
        expect(results[55].colorVolume).to.equal(60);
        expect(results[56].color.toStringHexRGB()).to.equal("#0c1411");
        expect(results[56].pixelCount).to.equal(59);
        expect(results[56].colorVolume).to.equal(16);
        expect(results[57].color.toStringHexRGB()).to.equal("#241d18");
        expect(results[57].pixelCount).to.equal(154);
        expect(results[57].colorVolume).to.equal(6);
        expect(results[58].color.toStringHexRGB()).to.equal("#042434");
        expect(results[58].pixelCount).to.equal(10);
        expect(results[58].colorVolume).to.equal(72);
        expect(results[59].color.toStringHexRGB()).to.equal("#263429");
        expect(results[59].pixelCount).to.equal(8);
        expect(results[59].colorVolume).to.equal(72);
        expect(results[60].color.toStringHexRGB()).to.equal("#b3a5ac");
        expect(results[60].pixelCount).to.equal(8);
        expect(results[60].colorVolume).to.equal(54);
        expect(results[61].color.toStringHexRGB()).to.equal("#82473c");
        expect(results[61].pixelCount).to.equal(17);
        expect(results[61].colorVolume).to.equal(20);
        expect(results[62].color.toStringHexRGB()).to.equal("#242c1a");
        expect(results[62].pixelCount).to.equal(12);
        expect(results[62].colorVolume).to.equal(16);
        expect(results[63].color.toStringHexRGB()).to.equal("#150c0c");
        expect(results[63].pixelCount).to.equal(15);
        expect(results[63].colorVolume).to.equal(12);
    });
    test("quantize a greyscale image", () => {
        const pixels: ArrayPixelBlob = new ArrayPixelBlob(testGrey200ImageData, 200, 125);

        const results: QuantizedColor[] = quantize(pixels);

        expect(results.length).to.equal(24);
        expect(results[0].color.toStringHexRGB()).to.equal("#1c1c1c");
        expect(results[0].pixelCount).to.equal(475);
        expect(results[0].colorVolume).to.equal(1);
        expect(results[1].color.toStringHexRGB()).to.equal("#141414");
        expect(results[1].pixelCount).to.equal(452);
        expect(results[1].colorVolume).to.equal(1);
        expect(results[2].color.toStringHexRGB()).to.equal("#242424");
        expect(results[2].pixelCount).to.equal(439);
        expect(results[2].colorVolume).to.equal(1);
        expect(results[3].color.toStringHexRGB()).to.equal("#6c6c6c");
        expect(results[3].pixelCount).to.equal(135);
        expect(results[3].colorVolume).to.equal(3);
        expect(results[4].color.toStringHexRGB()).to.equal("#2c2c2c");
        expect(results[4].pixelCount).to.equal(398);
        expect(results[4].colorVolume).to.equal(1);
        expect(results[5].color.toStringHexRGB()).to.equal("#bdbdbd");
        expect(results[5].pixelCount).to.equal(9);
        expect(results[5].colorVolume).to.equal(42);
        expect(results[6].color.toStringHexRGB()).to.equal("#343434");
        expect(results[6].pixelCount).to.equal(344);
        expect(results[6].colorVolume).to.equal(1);
        expect(results[7].color.toStringHexRGB()).to.equal("#3c3c3c");
        expect(results[7].pixelCount).to.equal(340);
        expect(results[7].colorVolume).to.equal(1);
        expect(results[8].color.toStringHexRGB()).to.equal("#acacac");
        expect(results[8].pixelCount).to.equal(21);
        expect(results[8].colorVolume).to.equal(16);
        expect(results[9].color.toStringHexRGB()).to.equal("#646464");
        expect(results[9].pixelCount).to.equal(167);
        expect(results[9].colorVolume).to.equal(2);
        expect(results[10].color.toStringHexRGB()).to.equal("#444444");
        expect(results[10].pixelCount).to.equal(321);
        expect(results[10].colorVolume).to.equal(1);
        expect(results[11].color.toStringHexRGB()).to.equal("#0c0c0c");
        expect(results[11].pixelCount).to.equal(313);
        expect(results[11].colorVolume).to.equal(1);
        expect(results[12].color.toStringHexRGB()).to.equal("#4c4c4c");
        expect(results[12].pixelCount).to.equal(298);
        expect(results[12].colorVolume).to.equal(1);
        expect(results[13].color.toStringHexRGB()).to.equal("#545454");
        expect(results[13].pixelCount).to.equal(292);
        expect(results[13].colorVolume).to.equal(1);
        expect(results[14].color.toStringHexRGB()).to.equal("#9c9c9c");
        expect(results[14].pixelCount).to.equal(48);
        expect(results[14].colorVolume).to.equal(6);
        expect(results[15].color.toStringHexRGB()).to.equal("#040404");
        expect(results[15].pixelCount).to.equal(248);
        expect(results[15].colorVolume).to.equal(1);
        expect(results[16].color.toStringHexRGB()).to.equal("#5c5c5c");
        expect(results[16].pixelCount).to.equal(246);
        expect(results[16].colorVolume).to.equal(1);
        expect(results[17].color.toStringHexRGB()).to.equal("#949494");
        expect(results[17].pixelCount).to.equal(54);
        expect(results[17].colorVolume).to.equal(4);
        expect(results[18].color.toStringHexRGB()).to.equal("#b4b4b4");
        expect(results[18].pixelCount).to.equal(9);
        expect(results[18].colorVolume).to.equal(15);
        expect(results[19].color.toStringHexRGB()).to.equal("#a4a4a4");
        expect(results[19].pixelCount).to.equal(32);
        expect(results[19].colorVolume).to.equal(4);
        expect(results[20].color.toStringHexRGB()).to.equal("#747474");
        expect(results[20].pixelCount).to.equal(121);
        expect(results[20].colorVolume).to.equal(1);
        expect(results[21].color.toStringHexRGB()).to.equal("#8c8c8c");
        expect(results[21].pixelCount).to.equal(54);
        expect(results[21].colorVolume).to.equal(2);
        expect(results[22].color.toStringHexRGB()).to.equal("#7c7c7c");
        expect(results[22].pixelCount).to.equal(102);
        expect(results[22].colorVolume).to.equal(1);
        expect(results[23].color.toStringHexRGB()).to.equal("#848484");
        expect(results[23].pixelCount).to.equal(82);
        expect(results[23].colorVolume).to.equal(1);
    });
});
