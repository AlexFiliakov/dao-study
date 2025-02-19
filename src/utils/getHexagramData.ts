import fs from 'fs/promises';
import path from 'path';

export async function getHexagramData() {
  try {
    const mappingPath = path.join(process.cwd(), 'public/docs/ddj_chapter_to_gua_mapping.json');
    const detailsPath = path.join(process.cwd(), 'public/docs/i_ching_guas.json');

    const [mappingData, detailsData] = await Promise.all([
      fs.readFile(mappingPath, 'utf-8'),
      fs.readFile(detailsPath, 'utf-8')
    ]);

    const hexagramMapping = JSON.parse(mappingData);
    const hexagramDetails = JSON.parse(detailsData);

    return { hexagramMapping, hexagramDetails };
  } catch (error) {
    console.error('Error loading hexagram data:', error);
    return { hexagramMapping: {}, hexagramDetails: {} };
  }
}