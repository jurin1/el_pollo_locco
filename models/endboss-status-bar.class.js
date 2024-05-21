class EndbossStatusBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];
    x = 495;
    y = 20;
    width = 200;
    height = 50;
    percentage = 100;

    constructor() {
        super();
        this.loadImage('img/7_statusbars/3_icons/icon_health_endboss.png')
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }

    
    decreaseEnergyOfEndbossStatusBar(enemy) {
        if (enemy instanceof Endboss) {
            this.setPercentage(enemy.energy);
        } else {
            return;
        }
    }
}