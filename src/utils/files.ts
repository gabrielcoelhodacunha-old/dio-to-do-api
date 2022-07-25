import fs from 'fs';

export function deleteFile(filePath: string) {
	fs.unlink(filePath, () => {});
}
