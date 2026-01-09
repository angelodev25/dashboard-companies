import express from 'express';
import { PrismaClient } from './generated/prisma/client.js';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

app.use(express.json());
app.use(cors())

app.post('/company', async (req, res) => {
  console.log("en servidor")
  try {
    console.log("Creando compañia.");
    
    const { userId, name, country, website, phone, rif, profileImage } = req.body;
    
    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Debes estar autenticado.' 
      });
    }
    
    const company = await prisma.company.create({
      data: {
        userId,
        name: name.trim(),
        country: country || null,
        website: website || null,
        phone: phone || null,
        rif: rif || null,
        profileImage: profileImage || "null",
      }
    });
    
    console.log('Compañía creada:', company.id);
    
    return res.status(201).json({
      success: true,
      message: 'Compañía creada exitosamente',
      data: company
    });
    
  } catch (error: any) {
    console.error('❌ Error:', error);
    
    // Error de duplicado (violación de constraint único)
    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        error: 'Registro duplicado',
        message: 'Ya existe una compañía con estos datos'
      });
    }
    
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Por favor intenta más tarde'
    });
  }
});

app.get('/companies', async (req, res) => {
  try {
    const userId = req.query.userId
    const id = userId?.toString()
    if (!id) {
      return res.status(401)
    }

    const companies = await prisma.company.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' }
    });
    console.log("Success GET - /companies")
    res.json({
      success: true,
      companies: companies
    });
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

app.get('/company/:id', async (req, res) => {
  try {
    const userId = req.query.userId
    const companyId = req.params.id
    const uID = userId?.toString()

    if (!uID) {
      return res.status(401).json({
        error: "Unauthorized"
      })
    }
    if (!companyId) {
      return
    }
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
        userId: uID
      }
    })
    res.json({
      success: true,
      company: company
    })  
  } catch (error: any) { 
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

app.put('/company/:companyId', async (req, res) => {
  try {
    const companyId = req.params.companyId
    const updateData = req.body.values
    const userId = req.body.userId

    if (!userId) return res.status(401)

    const existingCompany = await prisma.company.findUnique({
      where: {
        id: companyId,
        userId: userId
      }
    })
    if (!existingCompany) {
      return res.status(400).json({
        message: 'Compañia no encontrada'
      })
    }

    delete updateData.userId;
    delete updateData.id;

    const updateCompany = await prisma.company.update({
      where: {
        id: companyId
      }, 
      data: updateData
    })

    return res.json({
      success: true,
      message: 'compañia actualizada' + updateCompany
    })

  } catch (error: any) { 
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

app.post("/company/:companyId/contact", async (req, res) => {
  try {
    const companyId = req.params.companyId
    const { name, email, phone, role } = req.body

    const company = await prisma.company.findUnique({
      where: { id: companyId }
    })

    if (!company) {
      return res.status(404).json({
        error: "No se encontró la compañia",
        companyId: companyId
      })
    }

    const newContact = await prisma.contact.create({
      data: { companyId, name, email, phone, role }
    })

    console.log("Contacto creado")

    return res.status(201).json({
      message: "Contacto creado" + newContact
    })

  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: e.message })
  }
})

app.get('/contacts/:companyId', async (req, res) => {
  try {
    const companyId = req.params.companyId

    const contacts = await prisma.contact.findMany({
      where: {
        companyId: companyId
      }
    })

    if (!contacts) {
      return res.status(500).json({
        error: "No se encontraron contactos"
      })
    }

    return res.json({
      success: true,
      contacts: contacts
    })

  } catch (e: any) {
    console.log(e);
    res.status(500).json({
      error: e.message
    })
  }
})

app.delete("/company/:companyId", async (req, res) => {
  try {
    const id = req.params.companyId

    await prisma.company.delete({
      where: { id: id }
    })

    console.log("Company deleted")

    res.json({
      success: true,
      message: "Company deleted successfully"
    })

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Cannot Delete company",
      error: e
    })
  }
})

app.get("/events", async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: "desc" }
    })
    
    res.json({
      success: true,
      events: events
    })
  } catch (e) {
    res.status(500).json({
      error: e
    })
    console.log(e);
  }
})

app.post("/event/:companyId", async (req, res) => {
  try {
    const companyId = req.params.companyId
    const { title, start, allDay, timeFormat } = req.body.newEventPrisma
    if (!req.body.userId) {
      return res.status(401).json({
        error: "Unauthorized"
      })
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId }
    })

    if (!company) {
      return res.status(404).json({
        error: "Compañia no encontrada",
        message: "Compañia no encontrada"
      })
    }

    const created = await prisma.event.create({
      data: {
        companyId: companyId,
        title: title,
        start: start,
        allDay: allDay,
        timeFormat: timeFormat
      }
    })

    res.json({
      success: true,
      message: "event Creado" + created
    })
  } catch (e) {
    res.status(500).json({
      error: e,
      message: "Error en server"
    })
    console.log(e)
  }
})

app.delete("/event/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId

    if (!req.query.userId) {
      return res.status(401).json({
        error: "Acceso denegado"
      })
    }

    const deleted = await prisma.event.delete({
      where: { id: eventId }
    })

    return res.json({
      success: true,
      message: "Event Deleted",
      eventDeleted: deleted
    })

  } catch (e) {
    console.log(e)
    return res.status(500).json({
      error: e
    }) 
  }

})

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log(`🚀 Servidor Express ejecutándose`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log('='.repeat(50) + '\n');
});

process.on('SIGINT', async () => {
  console.log('\n🛑 Cerrando servidor...');
  await prisma.$disconnect();
  console.log('Prisma desconectado');
  process.exit(0);
});