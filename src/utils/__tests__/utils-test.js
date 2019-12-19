import { getStyleForPreviewPositions, effectInFirePosition, equalsPreviewPosition, fireToPreviewPosition } from '../index';

const effect = {
    id: 1,
    name: 'Fontana',
    shots: 1,
    duration: 60,
    videoUrl: "NTkv2uzVSOc",
    start: 0,
    end: 60,
    loop: false,
    color: 'hsla(100, 100%, 30%, 0.5)',
    previewPosition: 6,
    firePlace: 'right'
};

describe('effectInFirePosition', () => {
    it('effect is in fire position', () => {
        expect(effectInFirePosition(10, effect)).toEqual(true);
    });
    it('effect is not in fire position', () => {
        expect(effectInFirePosition(70, effect)).toEqual(false);
    });

});
