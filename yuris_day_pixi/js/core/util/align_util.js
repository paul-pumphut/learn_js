export class AlignUtil {
	constructor() {
	}

	static centerAnchor(target) {
		target.anchor.x = 0.5;
		target.anchor.y = 0.5;
		target.x += target.width * 0.5;
		target.y += target.height * 0.5;
	}

	static centerPivot(target) {
		target.pivot.x = target.width * 0.5;
		target.pivot.y = target.height * 0.5;
		target.x += target.width * 0.5;
		target.y += target.height * 0.5;

	}

	static center(frame, target, offset = { x: 0, y: 0 }) {
		target.x = (frame.x ?? 0) + (frame.width - target.width) / 2 + (offset.x ?? 0) + target.pivot.x;
		target.y = (frame.y ?? 0) + (frame.height - target.height) / 2 + (offset.y ?? 0) + target.pivot.y;
	}

	static fit(frame, target, offset = { x: 0, y: 0 }) {
		const horizontalRatio = frame.width / target.width;
		const verticalRatio = frame.height / target.height;
		if (horizontalRatio > verticalRatio) {
			target.width = frame.width;
			target.scaleY = target.scaleX;
		}
		else {
			target.height = frame.height;
			target.scaleX = target.scaleY;
		}
	}
}