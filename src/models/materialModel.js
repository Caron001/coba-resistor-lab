const db = require('../config/database');

const newMaterial = async (data) => {
  await db.query(
    `INSERT INTO materials(idmaterials, title, text_material) VALUES('${data.idmaterials}','${data.title}', '${data.text_material}')`
  );
  return true;
};

const newImage = async (data) => {
  await db.query(
    `INSERT INTO material_images(idmaterial_images, idmaterials, url_image) VALUES('${data.idmaterial_images}','${data.idmaterials}', '${data.url_image}')`
  );
  return true;
};

const groupMaterials = (rows) => {
  return rows.reduce((materials, row) => {
    let material = materials.find((m) => m.id === row.id);
    if (!material) {
      material = {
        id: row.id,
        title: row.title,
        content: row.content,
        images: [],
      };
      materials.push(material);
    }
    if (row.image_id) {
      material.images.push({
        id: row.image_id,
        url_image: row.url_image,
      });
    }
    return materials;
  }, []);
};

const getMaterial = async () => {
  const [rows] = await db.query(`
    SELECT
    m.idmaterials AS id,
    m.title,
    m.text_material AS content,
    mi.idmaterial_images AS image_id,
    mi.url_image
    FROM materials m
    LEFT JOIN material_images mi ON m.idmaterials = mi.idmaterials
    `);
  return groupMaterials(rows);
};

const getMaterialById = async (id) => {
  const [rows] = await db.query(
    `
    SELECT
    m.idmaterials AS id,
    m.title,
    m.text_material AS content,
    mi.idmaterial_images AS image_id,
    mi.url_image
    FROM materials m
    LEFT JOIN material_images mi ON m.idmaterials = mi.idmaterials
    WHERE m.idmaterials = ?
    `,
    [id]
  );
  const materials = groupMaterials(rows);
  return materials[0] || null;
};
module.exports = { newMaterial, newImage, getMaterial, getMaterialById };
