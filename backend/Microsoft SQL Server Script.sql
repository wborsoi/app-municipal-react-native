USE [master]
GO
/****** Object:  Database [Municipal_Test]    Script Date: 7/8/2022 21:17:51 ******/
CREATE DATABASE [Municipal_Test]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Municipal_Test', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Municipal_Test.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Municipal_Test_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Municipal_Test_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Municipal_Test] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Municipal_Test].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Municipal_Test] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Municipal_Test] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Municipal_Test] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Municipal_Test] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Municipal_Test] SET ARITHABORT OFF 
GO
ALTER DATABASE [Municipal_Test] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Municipal_Test] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Municipal_Test] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Municipal_Test] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Municipal_Test] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Municipal_Test] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Municipal_Test] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Municipal_Test] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Municipal_Test] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Municipal_Test] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Municipal_Test] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Municipal_Test] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Municipal_Test] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Municipal_Test] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Municipal_Test] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Municipal_Test] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Municipal_Test] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Municipal_Test] SET RECOVERY FULL 
GO
ALTER DATABASE [Municipal_Test] SET  MULTI_USER 
GO
ALTER DATABASE [Municipal_Test] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Municipal_Test] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Municipal_Test] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Municipal_Test] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Municipal_Test] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Municipal_Test] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'Municipal_Test', N'ON'
GO
ALTER DATABASE [Municipal_Test] SET QUERY_STORE = OFF
GO
USE [Municipal_Test]
GO
/****** Object:  UserDefinedFunction [dbo].[sfCantidadTotalDenuncias]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[sfCantidadTotalDenuncias]
(
	@owner AS VARCHAR(20) = NULL,
	@idSitio AS INT = NULL,
	@descripcion AS VARCHAR(2000) = NULL,
	@estado AS VARCHAR(150) = NULL,
	@aceptaResponsabilidad AS INT = NULL
)
RETURNS INT
AS
BEGIN
	DECLARE @cantidad INT

	SET @cantidad = (
		SELECT 
			COUNT(*) 
		FROM 
			denuncias 
		WHERE
			((@owner IS NULL) OR (documento = @owner))
		AND ((@idSitio IS NULL) OR (idSitio = @idSitio))
		AND ((@descripcion IS NULL) OR (descripcion = @descripcion))
		AND ((@estado IS NULL) OR (estado = @estado))
		AND ((@aceptaResponsabilidad IS NULL) OR (aceptaResponsabilidad = @aceptaResponsabilidad))
		)

	RETURN @cantidad

END
GO
/****** Object:  Table [dbo].[archivos_denuncias]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[archivos_denuncias](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idDenuncias] [int] NOT NULL,
	[url] [varchar](2000) NOT NULL,
 CONSTRAINT [PK_archivos_denuncias] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[archivos_promociones]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[archivos_promociones](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idPromocion] [int] NOT NULL,
	[url] [varchar](2000) NOT NULL,
 CONSTRAINT [PK_archivos_promociones] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[archivos_reclamos]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[archivos_reclamos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idReclamo] [int] NOT NULL,
	[url] [varchar](2000) NOT NULL,
 CONSTRAINT [PK_archivos_reclamos] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[barrios]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[barrios](
	[idBarrio] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](150) NOT NULL,
 CONSTRAINT [pk_barrios] PRIMARY KEY CLUSTERED 
(
	[idBarrio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[denuncias]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[denuncias](
	[idDenuncias] [int] IDENTITY(1,1) NOT NULL,
	[documento] [varchar](20) NOT NULL,
	[idSitio] [int] NULL,
	[descripcion] [varchar](2000) NULL,
	[estado] [varchar](150) NULL,
	[aceptaResponsabilidad] [int] NOT NULL,
 CONSTRAINT [pk_denuncias] PRIMARY KEY CLUSTERED 
(
	[idDenuncias] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[denuncias_detalles]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[denuncias_detalles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idDenuncias] [int] NOT NULL,
	[titulo] [varchar](200) NULL,
	[createDate] [date] NULL,
 CONSTRAINT [PK_denuncias_detalles] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[desperfectos]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[desperfectos](
	[idDesperfecto] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](200) NOT NULL,
	[idRubro] [int] NULL,
 CONSTRAINT [pk_desperfectos] PRIMARY KEY CLUSTERED 
(
	[idDesperfecto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[estado_reclamo]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[estado_reclamo](
	[idEstadoReclamo] [int] NOT NULL,
	[nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_estado_reclamo] PRIMARY KEY CLUSTERED 
(
	[idEstadoReclamo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[estado_solicitud]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[estado_solicitud](
	[id] [int] NOT NULL,
	[nombre] [varchar](100) NOT NULL,
 CONSTRAINT [PK_estado_solicitud] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[movimientosDenuncia]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[movimientosDenuncia](
	[idMovimiento] [int] IDENTITY(1,1) NOT NULL,
	[idDenuncia] [int] NOT NULL,
	[responsable] [varchar](150) NOT NULL,
	[causa] [varchar](4000) NOT NULL,
	[fecha] [datetime] NULL,
 CONSTRAINT [pk_movimientosDenuncia] PRIMARY KEY CLUSTERED 
(
	[idMovimiento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[movimientosReclamo]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[movimientosReclamo](
	[idMovimiento] [int] IDENTITY(1,1) NOT NULL,
	[idReclamo] [int] NOT NULL,
	[responsable] [varchar](150) NOT NULL,
	[causa] [varchar](1000) NOT NULL,
	[fecha] [datetime] NULL,
 CONSTRAINT [pk_movimientosReclamo] PRIMARY KEY CLUSTERED 
(
	[idMovimiento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[promociones]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[promociones](
	[idPromocion] [int] IDENTITY(1,1) NOT NULL,
	[documento] [varchar](20) NULL,
	[cuit] [varchar](50) NULL,
	[nombre] [varchar](200) NULL,
	[tipo] [varchar](50) NULL,
	[rubro] [varchar](50) NULL,
	[horarios] [varchar](200) NULL,
	[descripcion] [varchar](1000) NULL,
 CONSTRAINT [PK_promociones] PRIMARY KEY CLUSTERED 
(
	[idPromocion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[reclamos]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[reclamos](
	[idReclamo] [int] IDENTITY(1,1) NOT NULL,
	[documento] [varchar](20) NOT NULL,
	[idSitio] [int] NOT NULL,
	[idDesperfecto] [int] NULL,
	[descripcion] [varchar](1000) NULL,
	[estado] [varchar](30) NULL,
	[IdReclamoUnificado] [int] NULL,
 CONSTRAINT [pk_reclamos] PRIMARY KEY CLUSTERED 
(
	[idReclamo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[rubros]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[rubros](
	[idRubro] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](200) NOT NULL,
 CONSTRAINT [pk_rubros] PRIMARY KEY CLUSTERED 
(
	[idRubro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sitios]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sitios](
	[idSitio] [int] IDENTITY(1,1) NOT NULL,
	[latitud] [decimal](9, 5) NULL,
	[longitud] [decimal](9, 5) NULL,
	[calle] [varchar](150) NULL,
	[numero] [int] NULL,
	[entreCalleA] [varchar](150) NULL,
	[entreCalleB] [varchar](150) NULL,
	[descripcion] [varchar](300) NULL,
	[aCargoDe] [varchar](200) NULL,
	[apertura] [time](7) NULL,
	[cierre] [time](7) NULL,
	[comentarios] [text] NULL,
 CONSTRAINT [pk_sitios] PRIMARY KEY CLUSTERED 
(
	[idSitio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[solicitudes_claves]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[solicitudes_claves](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[vecino_documento] [varchar](20) NOT NULL,
	[estado_solicitud_id] [int] NOT NULL,
	[email] [varchar](100) NULL,
	[password] [varchar](100) NOT NULL,
 CONSTRAINT [PK_solicitudes_claves] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipo_usuario]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipo_usuario](
	[id] [int] NOT NULL,
	[nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_tipo_usuario] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuarios]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuarios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[vecino_documento] [varchar](20) NOT NULL,
	[usuario_tipo_id] [int] NOT NULL,
	[password] [varchar](100) NOT NULL,
 CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[vecinos]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[vecinos](
	[documento] [varchar](20) NOT NULL,
	[nombre] [varchar](150) NOT NULL,
	[apellido] [varchar](150) NOT NULL,
	[direccion] [varchar](250) NULL,
	[codigoBarrio] [int] NULL,
 CONSTRAINT [pk_vecinos] PRIMARY KEY CLUSTERED 
(
	[documento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[desperfectos] ON 

INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (1, N'Adherirse al programa AVELLANEDA RECICLA', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (2, N'Aguas servidas en la vía pública', 2)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (3, N'Alarma Vecinal', 3)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (4, N'alimentos', 4)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (5, N'Alimentos en mal estado en fábrica o comercio de alimentos', 5)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (6, N'Alimentos vencidos en fábrica o comercio de alimentos', 5)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (7, N'Animal con dueño irresponsable suelto en vía pública - ataca , muerde, molesta-.', 6)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (8, N'Animal maltratado en vía pública o domicilio privado', 6)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (9, N'Animal mordiendo en vía pública', 6)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (10, N'Animal que mató en vía pública a otro animal', 6)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (11, N'Animales Sueltos', 7)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (12, N'Arbol con peligro real de caida y/o accidente', 8)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (13, N'Arboles', 7)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (14, N'Arreglo de bache', 9)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (15, N'Arreglo de cordón', 9)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (16, N'Arreglo de juntas de calle', 9)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (17, N'Arreglo de rampa para discapacitados existentes', 9)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (18, N'Arreglo y mejoramiento de calles de tierra o empedradas.', 9)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (19, N'Asesoramiento Juridico', 10)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (20, N'Asesoramiento para Pensiones', 4)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (21, N'Asesoramiento por desnutricion', 4)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (22, N'Asesoramiento por Discapacidad', 4)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (23, N'Asesoramiento por Diversidad', 4)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (24, N'Asesoramiento por pensiones no contributivas', 4)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (25, N'Atención Primaria de la Salud - Unidades Sanitarias', 11)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (26, N'Ausencia de Adulto Responsable - Informar fallecimiento de Adulto responsable', 12)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (27, N'Auto Abandonado, Quemado o Destruido.', 13)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (28, N'AYSA', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (29, N'Bancos', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (30, N'Basura o basural', 7)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (31, N'Basura y residuos', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (32, N'Basural', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (33, N'Bebe hallado en via publica', 12)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (34, N'Boca de tormenta /Sumidero tapado', 9)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (35, N'Bolsas Negras del Barrido sin retirar -', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (36, N'Botón Antipánico por Violencia del genero o familiar con oficio judicial', 3)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (37, N'Cable', 7)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (38, N'Camiones mal estacionados', 15)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (39, N'Caño de desagüe que va por vereda tapado - Albañal', 9)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (40, N'Cloaca tapada en Villa Corina', 2)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (41, N'Colchonerías', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (42, N'Colocación de Cartel prohíbido arrojar basura', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (43, N'Colocación de cesto de basura en domicilio', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (44, N'COMERCIO SIN HABILITAR', 16)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (45, N'Compañía de Seguros', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (46, N'compra de anteojos', 17)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (47, N'Concesionaria de Autos y Motos', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (48, N'Consulta Requisitos específicos para Habilitación Comercial', 16)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (49, N'Corte de cesped', 8)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (50, N'Cortes de Suministro', 7)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (51, N'cucaracha, pulga, garrapata en vía pública', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (52, N'Daño comprobado en la salud por emanaciones del PoloPetoquimico', 19)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (53, N'Demoliciones sin cartel de obra', 20)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (54, N'Denuncia a Personal Policial', 21)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (55, N'Denuncia de daño al árbol recién plantado', 8)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (56, N'Denuncia de vecino sobre RESIDUOS', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (57, N'Denuncias de Explosiones o Atentados', 7)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (58, N'Denuncias desempeño en Vía Pública', 22)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (59, N'Derecho a la Educacion - Sin acceso o prohibicion de inscripcion', 12)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (60, N'Derecho a la Identidad - Niño o niña con Partida Nacimiento sin DNI, Mayor a 14 años', 12)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (61, N'Derecho a la Identidad - Niño o niña con Partida Nacimiento sin DNI, Menor a 12 años', 12)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (62, N'Derecho a la Identidad - Niño o niña indocumentado NN mayor a 12 años de edad', 12)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (63, N'Derecho a la Identidad - Niño o niña indocumentado NN menor a 12 años de edad', 12)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (64, N'Derecho a la Salud - Dificultades para el acceso a la salud indispensables para el desarrollo del Niño o Niña', 12)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (65, N'Derecho al Buentrato - Violencia Infantil Familiar', 12)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (66, N'Derecho al Buentrato - Violencia Infantil Fisica', 12)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (67, N'Derecho al Buentrato - Violencia Infantil Psicologica', 12)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (68, N'Derrame', 7)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (69, N'Derrumbe', 7)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (70, N'Desinfección de Vehículos', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (71, N'Desinfección en Instituciones Educativas', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (72, N'Desinfección en Instituciones Educativas', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (73, N'Desinfección en oficinas municipales', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (74, N'Desinfección Industrial', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (75, N'Desinsectación', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (76, N'desinsectación', 23)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (77, N'Desinsectación', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (78, N'desinsectación en instituciones deportivas, culturales', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (79, N'desinsectación en vía pública', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (80, N'desperfecto de luminaria', 24)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (81, N'desperfecto de semaforo', 24)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (82, N'Desratización', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (83, N'Desratización', 25)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (84, N'Desratización', 26)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (85, N'Desratización', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (86, N'Desratización', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (87, N'Desratización', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (88, N'Detención Arbitraria', 10)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (89, N'Diarios, Revistas y publicaciones', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (90, N'Discriminación', 21)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (91, N'Dolencias físicas por Ocupación de terreno contaminado', 19)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (92, N'Edesur S.A.', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (93, N'Electrodomesticos', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (94, N'Empresas de Servicios de Seguridad y Alarmas', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (95, N'Entrega de leche para embarazadas y niños hasta 5 años en la unidad sanitaria', 27)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (96, N'Entrega y/o colocación de anticonceptivos', 27)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (97, N'Escape de Fluidos', 7)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (98, N'Eximicion de pago DNI', 4)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (99, N'Eximicion de taza Migratoria', 4)
GO
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (100, N'Explosiones', 7)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (101, N'Falta de agua en Villa Corina', 2)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (102, N'Falta de entrega de agua en bidones durante fin de semana largo a vecinos de Villa Inflamable', 19)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (103, N'Falta de higiene en fábrica o comercio de alimentos', 5)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (104, N'falta de limpieza en los institutos', 28)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (105, N'falta de profesionales en los Institutos de atencion', 28)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (106, N'Faltante de medicación', 27)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (107, N'Faltante de Medicamentos o remedios', 29)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (108, N'Faltante de tapa de medidor EDESUR', 30)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (109, N'Faltante de tapa redonda de AySA', 30)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (110, N'Ferrocarril', 7)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (111, N'fumigación', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (112, N'Hundimiento', 7)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (113, N'Incendio', 7)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (114, N'Inconvenientes Licencias de Conducir', 31)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (115, N'Inconvenientes varios por obra nueva de cloaca', 2)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (116, N'Indumentaria', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (117, N'Información de días y horarios de reunión de la Mesa de Gestión Comunitaria en Salud', 29)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (118, N'Infracciones y multas de tránsito', 32)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (119, N'Inicie un expediente relacionado a un tributo municipal y al día de la fecha no recibí respuesta', 33)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (120, N'Institutos - solicitud de atención por falta de atención de su obra social -', 28)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (121, N'Internet', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (122, N'Intervenciones involuntarias ambulatorias o internaciones', 34)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (123, N'La boleta del tributo no viene a mi nombre.', 33)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (124, N'La boleta del tributo viene a mi nombre pero ya no soy el titular', 33)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (125, N'Lavadero de Ropa, Tintorerías.', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (126, N'Libre Inhumacion', 4)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (127, N'Limpieza de Contenedores', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (128, N'limpieza de tanque establecimientos municipales', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (129, N'limpieza de tanque instituciones educativas municipales', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (130, N'limpieza de tanque instituciones educativas provinciales', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (131, N'limpieza de tanque instituciones educativas provinciales', 18)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (132, N'Limpieza, Higiene y recolección en plazas barriales , parques , paseos y espacios publicos', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (133, N'Maderas , Basura', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (134, N'Maderas , Basura', 35)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (135, N'mala atención del personal de los institutos al contribuyente - Odontologia Infantil - Rehabilitación- Resolución inmediata - medicina del deporte - Adicciones - área de violencia y vacunas', 28)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (136, N'MALAS PRÁCTICAS EN COMERCIOS', 16)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (137, N'malas practicas en las tareas que desarrolla una fábrica o industria.', 36)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (138, N'Mantenimiento de señalización', 9)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (139, N'Me cobran dos veces el Alumbrado Público, en las boletas de EDESUR y en la boleta de la Tasa Servicios Generales', 33)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (140, N'Me reclaman una deuda de un tributo que ya aboné', 33)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (141, N'Medicina Prepaga', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (142, N'Medios de pago', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (143, N'Metrogas S.A.', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (144, N'Muebles y Artículos de Decoración', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (145, N'Nino o niña en situación de calle', 12)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (146, N'No quiero que me cobren el Alumbrado Público a través de Edesur', 33)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (147, N'No recibió la boleta', 37)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (148, N'Notificación de animales sospechosos de enfermedades zoonóticas', 6)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (149, N'nueva actividad fabril en un local', 36)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (150, N'Obra particular en construcción sin permiso municipal', 20)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (151, N'Obras en construcción que no tengan bandejas de protección', 20)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (152, N'Obras en construcción que provocan deterioros a linderos', 20)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (153, N'Obstáculos para la participación en la Mesa de Gestión en Salud', 29)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (154, N'Ocupación Espacios Públicos', 7)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (155, N'Olores', 7)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (156, N'Olores que salen de una fábrica', 36)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (157, N'Ordenamiento y control Tránsito Urbano', 15)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (158, N'Otras consultas boletas de tasas', 33)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (159, N'Otros animales en vía pública y/o propiedad privada', 6)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (160, N'Otros productos', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (161, N'Otros Servicios', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (162, N'Pagué dos veces la misma boleta del tributo', 33)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (163, N'Pavimento roto por obra nueva de cloaca', 2)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (164, N'Pedido de chipeado Avellaneda Recicla', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (165, N'Pedido de Compostera Avellaneda Recicla', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (166, N'Pedido de patrullaje', 3)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (167, N'pedido de protesis', 29)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (168, N'Pedido de Subsidios', 17)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (169, N'Peluquerías, estéticas', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (170, N'Perdida de agua en calzada', 30)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (171, N'Perdida de agua en vereda', 30)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (172, N'Persona actualmente contaminada con problemas de salud sin atencion', 19)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (173, N'Personas en situación de calle', 7)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (174, N'Poda de Altura', 8)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (175, N'Poda de Despeje', 8)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (176, N'Poda General', 8)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (177, N'Poste con tendido eléctrico Medidor Comunitario', 38)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (178, N'Poste de madera defectuoso', 30)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (179, N'Poste sin tendido', 38)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (180, N'Postes', 7)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (181, N'Pozos', 7)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (182, N'Presencia de Caminantes de la policía Local', 3)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (183, N'Presencia de insectos raros, ponzoñosos.', 6)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (184, N'Presencia de murciélagos', 6)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (185, N'presencia de patrullaje', 3)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (186, N'Presencia de plagas en fábrica o comercio de alimentos', 5)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (187, N'Presuncion de Abandono de un niño o niña', 12)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (188, N'Presuncion de Trata contra un Niño o Niña', 12)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (189, N'Problema con el acceso a los beneficios de Somos A', 39)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (190, N'Problemas con el servicio de ambulancia de la Unidad Sanitaria Ambiental de Villa Inflamable', 19)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (191, N'Problemas de inspección a comercios', 39)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (192, N'Problemas del comercio en la participación en Somos A', 39)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (193, N'Problemas en la convocatoria a la Mesa de Gestión en la Unidad Sanitaria', 29)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (194, N'Problemas para la obtencion de turnos para toxicología en la Unidad Sanitaria Ambiental', 19)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (195, N'proceso de inspección comercial sospechoso', 16)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (196, N'Quiero que la boleta del tributo me llegue a otro domicilio.', 33)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (197, N'Ramas Mucha cantidad para retirar con máquina', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (198, N'Ramas poca cantidad', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (199, N'Recepción de animales muertos que mordieron solo para diagnóstico de rabia.', 6)
GO
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (200, N'Recibió la boleta después de la fecha de vencimiento', 37)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (201, N'Recibió una boleta que no es propia', 37)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (202, N'Reclamos por geriatrico, sanatorios, hospitales', 17)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (203, N'Refuerzo de patrullaje', 3)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (204, N'Refugio de colectivo', 9)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (205, N'Reparacion de boca de tormenta / Sumidero', 9)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (206, N'Reparación de botón Antipánico', 3)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (207, N'Reparación de Camara de Seguridad', 3)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (208, N'Reparacion de caño de desague / albañal', 9)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (209, N'Reparación de juegos y/o bancos en plazas', 9)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (210, N'Reparaciones en General, Servicios Técnicos.', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (211, N'Reposición de carteles varios', 9)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (212, N'Reposición de tapas de desagües pluviales faltantes o rotas.', 9)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (213, N'Repuestos para autos, motos. Neumáticos, accesorios en general para el vehículo', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (214, N'requerimiento colchon', 4)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (215, N'Requerimiento de estudios toxicológicos por sospecha de tóxicos en el agua', 19)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (216, N'Requerimiento de interconsultas por problemas de salud por contaminacion ambiental', 19)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (217, N'Retiro Animal Muerto , doméstico en vía pública', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (218, N'Retiro de Arena en Bolsas', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (219, N'Retiro de Arena Suelta', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (220, N'Retiro de colchones', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (221, N'Retiro de Maderas', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (222, N'Retiro de Muebles viejos y rotos y artefactos de cocina', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (223, N'Retiro de Neumáticos en desuso Avellaneda Recicla', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (224, N'Retiro de pasacalles', 9)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (225, N'Retiro de Residuos Reciclables', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (226, N'Retiro de Tierra en Bolsas', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (227, N'Retiro de Tierra Suelta', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (228, N'Retiro de Troncos', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (229, N'Ruidos que salen de una fábrica', 36)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (230, N'se verifia que el comerciante no tire residuos en la via publica', 5)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (231, N'Semaforos sin funcionar', 22)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (232, N'Sepelios', 4)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (233, N'Sepelios', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (234, N'Servicio cortado por poda', 30)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (235, N'Sin Barrido Municipal', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (236, N'Sin recolección domiciliaria - Basura y residuos', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (237, N'Situacion de calle solo hombres', 4)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (238, N'Solicitud de Contenedores', 1)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (239, N'Solicitud de plantación de árbol', 8)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (240, N'Solicitud de reenvio de cuota actualizada.', 37)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (241, N'solicitud de turnos Área de Prevención y Atención de la violencia y abuso sexual', 28)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (242, N'solicitud de turnos Instituto de Rehabilitacion', 28)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (243, N'solicitud de turnos instituto de resolución Inmediata', 28)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (244, N'solicitud de turnos medicina del deporte', 11)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (245, N'solicitud de turnos para instituto de prevención y atención para las adicciones', 28)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (246, N'solicitud de turnos para odontología infantil', 28)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (247, N'Taller Mecánico de Autos y Motos.', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (248, N'tarjeta ticket nacion de alimentos', 4)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (249, N'Tarjetas de Créditos o Financieras', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (250, N'Telefonía Celular', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (251, N'Telefonía Fija', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (252, N'tramites autorizacion de estudios', 29)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (253, N'Turismo', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (254, N'Turnos de salud mental y adicciones', 34)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (255, N'TV por Cable', 14)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (256, N'unidad de Emergencia', 17)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (257, N'Vehiculo Mal Estacionado', 15)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (258, N'VENTA DE BEBIDAS ALCOHOLICAS', 16)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (259, N'Venta de pirotecnia', 3)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (260, N'VENTA EN LA VIA PUBLICA', 16)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (261, N'Vereda rota por empresa de servicios', 30)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (262, N'Vereda rota por obra de MDA', 9)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (263, N'Vereda rota por obra nueva de cloaca', 2)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (264, N'Violencia de Genero y Familiar', 40)
INSERT [dbo].[desperfectos] ([idDesperfecto], [descripcion], [idRubro]) VALUES (265, N'Violencia Institucional', 21)
SET IDENTITY_INSERT [dbo].[desperfectos] OFF
GO
INSERT [dbo].[estado_reclamo] ([idEstadoReclamo], [nombre]) VALUES (1, N'Creado')
INSERT [dbo].[estado_reclamo] ([idEstadoReclamo], [nombre]) VALUES (2, N'Aprobado')
INSERT [dbo].[estado_reclamo] ([idEstadoReclamo], [nombre]) VALUES (3, N'Rechazado')
INSERT [dbo].[estado_reclamo] ([idEstadoReclamo], [nombre]) VALUES (4, N'En revision')
INSERT [dbo].[estado_reclamo] ([idEstadoReclamo], [nombre]) VALUES (5, N'Finalizado')
GO
INSERT [dbo].[estado_solicitud] ([id], [nombre]) VALUES (1, N'Creado')
INSERT [dbo].[estado_solicitud] ([id], [nombre]) VALUES (2, N'Aprobado')
INSERT [dbo].[estado_solicitud] ([id], [nombre]) VALUES (3, N'Rechazado')
INSERT [dbo].[estado_solicitud] ([id], [nombre]) VALUES (4, N'Finalizado')
GO
SET IDENTITY_INSERT [dbo].[rubros] ON 

INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (1, N'Subsecretaría de Gestión de Residuos')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (2, N'Subsecretaría de Infraestructura')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (3, N'Secretaria de Seguridad')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (4, N'Subsecretaría de Desarrollo Social')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (5, N'Subdirección de Bromatología')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (6, N'Dirección de Zoonosis')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (7, N'Defensa Civil')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (8, N'Sector Espacios Verdes')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (9, N'Sector ejecución arreglos en Vía Pública')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (10, N'Dirección Promoción D. Humanos')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (11, N'Atención Primaria - Unidades Sanitarias')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (12, N'Dir. Gral. de Niñez, Adolescencia y Familia')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (13, N'Sector Autos Abandonados')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (14, N'Defensa del Consumidor')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (15, N'Dpto. de Planificación y Seguridad Vial')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (16, N'Dir. Gral. Habilitaciones Comerciales e Inspección en Esp. Público')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (17, N'Sanatorios - Geriátricos - Privados - Hospitales')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (18, N'Dir. de Coordinación Control Ambiental')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (19, N'Dirección de Salud Ambiental')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (20, N'Dir. de Catastro y Obras Particulares')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (21, N'Dirección Protección D. Humanos')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (22, N'Dirección General de Seguridad Ciudadana')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (23, N'Dir. de Coordinación Control Ambiental)')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (24, N'Subdirección de Alumbrado Público y Semáforos')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (25, N'escuelas municipal')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (26, N'escuelas provinciales')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (27, N'Programas Sanitarios')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (28, N'Subsecretaría de Salud - Institutos')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (29, N'Salud')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (30, N'Subdirección de Vía Publica')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (31, N'Departamento Licencias de Conducir')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (32, N'Subsecretaría de tránsito y Control vial')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (33, N'Dirección General Tributaria')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (34, N'Salud Mental')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (35, N'almeja')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (36, N'Subsecretaría de Fiscalización y Política Ambiental')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (37, N'Dirección de Organización Tributaria')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (38, N'Dirección de Alumbrado, Sistemas Eléctricos y Vía Pública')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (39, N'Subsecretaria de Comercio')
INSERT [dbo].[rubros] ([idRubro], [descripcion]) VALUES (40, N'Secretaria de Derechos Humanos')
SET IDENTITY_INSERT [dbo].[rubros] OFF
GO
INSERT [dbo].[tipo_usuario] ([id], [nombre]) VALUES (1, N'Vecino')
INSERT [dbo].[tipo_usuario] ([id], [nombre]) VALUES (2, N'Inspector')
GO
SET IDENTITY_INSERT [dbo].[usuarios] ON 

INSERT [dbo].[usuarios] ([id], [vecino_documento], [usuario_tipo_id], [password]) VALUES (1, N'1234', 1, N'1234')
SET IDENTITY_INSERT [dbo].[usuarios] OFF
GO
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1027922', N'Lopez', N'Diego Gabriel', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1035505', N'Foglino', N'Tomás', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1037578', N'Enriquez', N'Ariel Leandro', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1038885', N'Gioffre', N'Lucas Daniel', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1039164', N'Moran', N'Yesica Yanina', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1040028', N'Solari', N'Lucas Pehuen', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1046496', N'Fernandez Canto', N'Sebastian Lucas', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1050293', N'Nam', N'Micaela', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1052592', N'Araujo', N'Manuel', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1056145', N'Bergoglio', N'Ramiro', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1063991', N'Di Maria', N'Alan Ezequiel', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1068498', N'Di Fresco', N'Lucas', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1070047', N'Bellisario', N'Agustina Paula', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1072150', N'Aizpun', N'Juan Cruz', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1072883', N'Gonzalez Raggi', N'Nicolas Gustavo', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1072948', N'Buzzetti', N'Martin', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1078362', N'Borsoi', N'Walter Nicolas', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1083011', N'Estrella', N'Nicolas', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1083033', N'Barth', N'Jonathan', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1084200', N'Altairac', N'Santiago Germán', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1085839', N'Olivato', N'Marcelo Ruben', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1088304', N'Pissani', N'Alejandra Ines', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1090111', N'Barreiro', N'Sebastian', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1092598', N'Enriquez', N'Elva Belen', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1096542', N'Alvarez Jurado', N'Ignacio', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1097731', N'Alric Cortabarria', N'Juan Cruz', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1098460', N'Motta', N'Agustin Fabio', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1099073', N'Oliver', N'Guillermo Luis', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'110107', N'Currotto', N'Martin Eugenio', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1101102', N'Wang', N'Jian', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1105951', N'Rapaport', N'Matias', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1109587', N'Estraño Colina', N'Maria Grazia', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1114075', N'Ansede', N'Guido Nicolas', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1114443', N'Braithwaite', N'Thomas', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1114671', N'Santos', N'Nicolas Martin', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1114712', N'Nisi', N'Franco Ricardo', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1114764', N'Boyer', N'Nicolas Matias', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1114907', N'Valenzuela Arari', N'Alan Marcos David', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1118523', N'Stella', N'Gabriel', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1119285', N'Grieben', N'Matias', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1120936', N'Quintana', N'Pablo Adrian', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1121066', N'Comerci', N'Alexis Martín', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1128431', N'Nenadovit', N'Emmanuel Angel', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'1234', N'test', N'test', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'124591', N'Sarubbi', N'Martin Nicolás', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'126998', N'Gallo', N'Yesica Micaela', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'138134', N'Zagi', N'Javier Nicolas', NULL, NULL)
INSERT [dbo].[vecinos] ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'42095', N'Godio', N'Claudio Jose', NULL, NULL)
GO
ALTER TABLE [dbo].[movimientosDenuncia] ADD  DEFAULT (getdate()) FOR [fecha]
GO
ALTER TABLE [dbo].[movimientosReclamo] ADD  DEFAULT (getdate()) FOR [fecha]
GO
ALTER TABLE [dbo].[archivos_denuncias]  WITH CHECK ADD  CONSTRAINT [FK_archivosDenuncias_denuncias] FOREIGN KEY([idDenuncias])
REFERENCES [dbo].[denuncias] ([idDenuncias])
GO
ALTER TABLE [dbo].[archivos_denuncias] CHECK CONSTRAINT [FK_archivosDenuncias_denuncias]
GO
ALTER TABLE [dbo].[archivos_promociones]  WITH CHECK ADD  CONSTRAINT [FK_archivosPromociones_promocion] FOREIGN KEY([idPromocion])
REFERENCES [dbo].[promociones] ([idPromocion])
GO
ALTER TABLE [dbo].[archivos_promociones] CHECK CONSTRAINT [FK_archivosPromociones_promocion]
GO
ALTER TABLE [dbo].[archivos_reclamos]  WITH CHECK ADD  CONSTRAINT [FK_archivosReclamos_reclamo] FOREIGN KEY([idReclamo])
REFERENCES [dbo].[reclamos] ([idReclamo])
GO
ALTER TABLE [dbo].[archivos_reclamos] CHECK CONSTRAINT [FK_archivosReclamos_reclamo]
GO
ALTER TABLE [dbo].[denuncias]  WITH CHECK ADD  CONSTRAINT [fk_denuncias_sitios] FOREIGN KEY([idSitio])
REFERENCES [dbo].[sitios] ([idSitio])
GO
ALTER TABLE [dbo].[denuncias] CHECK CONSTRAINT [fk_denuncias_sitios]
GO
ALTER TABLE [dbo].[denuncias]  WITH CHECK ADD  CONSTRAINT [fk_denuncias_vecinos] FOREIGN KEY([documento])
REFERENCES [dbo].[vecinos] ([documento])
GO
ALTER TABLE [dbo].[denuncias] CHECK CONSTRAINT [fk_denuncias_vecinos]
GO
ALTER TABLE [dbo].[denuncias_detalles]  WITH CHECK ADD  CONSTRAINT [FK_denuncias_detalles_denuncias] FOREIGN KEY([idDenuncias])
REFERENCES [dbo].[denuncias] ([idDenuncias])
GO
ALTER TABLE [dbo].[denuncias_detalles] CHECK CONSTRAINT [FK_denuncias_detalles_denuncias]
GO
ALTER TABLE [dbo].[movimientosDenuncia]  WITH CHECK ADD  CONSTRAINT [fk_movimientosDenuncia_denuncias] FOREIGN KEY([idDenuncia])
REFERENCES [dbo].[denuncias] ([idDenuncias])
GO
ALTER TABLE [dbo].[movimientosDenuncia] CHECK CONSTRAINT [fk_movimientosDenuncia_denuncias]
GO
ALTER TABLE [dbo].[movimientosReclamo]  WITH CHECK ADD  CONSTRAINT [fk_movimientosReclamo_reclamos] FOREIGN KEY([idReclamo])
REFERENCES [dbo].[reclamos] ([idReclamo])
GO
ALTER TABLE [dbo].[movimientosReclamo] CHECK CONSTRAINT [fk_movimientosReclamo_reclamos]
GO
ALTER TABLE [dbo].[promociones]  WITH CHECK ADD  CONSTRAINT [FK_promociones_vecinos1] FOREIGN KEY([documento])
REFERENCES [dbo].[vecinos] ([documento])
GO
ALTER TABLE [dbo].[promociones] CHECK CONSTRAINT [FK_promociones_vecinos1]
GO
ALTER TABLE [dbo].[reclamos]  WITH CHECK ADD  CONSTRAINT [fk_reclamos_desperfectos] FOREIGN KEY([idDesperfecto])
REFERENCES [dbo].[desperfectos] ([idDesperfecto])
GO
ALTER TABLE [dbo].[reclamos] CHECK CONSTRAINT [fk_reclamos_desperfectos]
GO
ALTER TABLE [dbo].[reclamos]  WITH CHECK ADD  CONSTRAINT [fk_reclamos_reclamos] FOREIGN KEY([IdReclamoUnificado])
REFERENCES [dbo].[reclamos] ([idReclamo])
GO
ALTER TABLE [dbo].[reclamos] CHECK CONSTRAINT [fk_reclamos_reclamos]
GO
ALTER TABLE [dbo].[reclamos]  WITH CHECK ADD  CONSTRAINT [fk_reclamos_sitios] FOREIGN KEY([idSitio])
REFERENCES [dbo].[sitios] ([idSitio])
GO
ALTER TABLE [dbo].[reclamos] CHECK CONSTRAINT [fk_reclamos_sitios]
GO
ALTER TABLE [dbo].[reclamos]  WITH CHECK ADD  CONSTRAINT [fk_reclamos_vecinos] FOREIGN KEY([documento])
REFERENCES [dbo].[vecinos] ([documento])
GO
ALTER TABLE [dbo].[reclamos] CHECK CONSTRAINT [fk_reclamos_vecinos]
GO
ALTER TABLE [dbo].[solicitudes_claves]  WITH CHECK ADD  CONSTRAINT [FK_solicitudes_claves_estado_solicitud] FOREIGN KEY([estado_solicitud_id])
REFERENCES [dbo].[estado_solicitud] ([id])
GO
ALTER TABLE [dbo].[solicitudes_claves] CHECK CONSTRAINT [FK_solicitudes_claves_estado_solicitud]
GO
ALTER TABLE [dbo].[solicitudes_claves]  WITH CHECK ADD  CONSTRAINT [FK_solicitudes_claves_vecinos] FOREIGN KEY([vecino_documento])
REFERENCES [dbo].[vecinos] ([documento])
GO
ALTER TABLE [dbo].[solicitudes_claves] CHECK CONSTRAINT [FK_solicitudes_claves_vecinos]
GO
ALTER TABLE [dbo].[usuarios]  WITH CHECK ADD  CONSTRAINT [FK_Usuarios_tipo_usuario] FOREIGN KEY([usuario_tipo_id])
REFERENCES [dbo].[tipo_usuario] ([id])
GO
ALTER TABLE [dbo].[usuarios] CHECK CONSTRAINT [FK_Usuarios_tipo_usuario]
GO
ALTER TABLE [dbo].[usuarios]  WITH CHECK ADD  CONSTRAINT [FK_Usuarios_vecinos] FOREIGN KEY([vecino_documento])
REFERENCES [dbo].[vecinos] ([documento])
GO
ALTER TABLE [dbo].[usuarios] CHECK CONSTRAINT [FK_Usuarios_vecinos]
GO
ALTER TABLE [dbo].[vecinos]  WITH CHECK ADD  CONSTRAINT [fk_vecinos_barrios] FOREIGN KEY([codigoBarrio])
REFERENCES [dbo].[barrios] ([idBarrio])
GO
ALTER TABLE [dbo].[vecinos] CHECK CONSTRAINT [fk_vecinos_barrios]
GO
/****** Object:  StoredProcedure [dbo].[spAprobarSolicitud]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spAprobarSolicitud] (
	@dni AS VARCHAR(20)
)
AS
BEGIN
	DECLARE @idSolicitud INT
	DECLARE @password VARCHAR(100)
	SET @idSolicitud = (SELECT id FROM solicitudes_claves WHERE vecino_documento = @dni AND estado_solicitud_id = 1)
	SET @password = (SELECT password FROM solicitudes_claves WHERE id = @idSolicitud)

	IF(@idSolicitud IS NOT NULL)
		BEGIN
			UPDATE solicitudes_claves SET estado_solicitud_id = 2 WHERE id = @idSolicitud;
			EXEC spGenerarClave @dni, @password;
			SELECT 1 AS codigo, 'Se ha aprobado la solicitud' AS descripcion , @idSolicitud AS idSolicitud
		END
	ELSE
		BEGIN
			SELECT 0 AS codigo, 'No se ha pido aprobar la solicitud ya que no existe o esta en un estado avanzado' AS descripcion, @idSolicitud AS idSolicitud
		END
END;
GO
/****** Object:  StoredProcedure [dbo].[spBuscarDenuncia]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE PROCEDURE [dbo].[spBuscarDenuncia](
	@owner AS VARCHAR(20) = NULL,
	@idSitio AS INT = NULL,
	@descripcion AS VARCHAR(2000) = NULL,
	@estado AS VARCHAR(150) = NULL,
	@aceptaResponsabilidad AS INT = NULL,
	@offset AS INT = 0,
	@limit AS INT = 10
)
AS
BEGIN
	SELECT 
		denuncias.idDenuncias,
		denuncias_detalles.titulo AS 'title',
		denuncias_detalles.createDate AS 'creation_date',
		denuncias.descripcion AS 'descripcionDenuncia',
		denuncias.estado,
		denuncias.aceptaResponsabilidad,
		vecinos.nombre AS 'nombre',
		vecinos.apellido,
		vecinos.documento AS 'dni',
		tipo_usuario.nombre AS 'rol',
		sitios.idSitio,
		sitios.latitud,
		sitios.longitud,
		sitios.calle,
		sitios.numero,
		sitios.entreCalleA,
		sitios.entreCalleB,
		sitios.descripcion AS 'descripcionSitio',
		sitios.aCargoDe,
		sitios.apertura,
		sitios.cierre,
		sitios.comentarios,
		@offset AS 'offset', 
		@limit AS 'limit', 
		dbo.sfCantidadTotalDenuncias(@owner, @idSitio, @descripcion, @estado, @aceptaResponsabilidad) AS 'count'
	FROM 
		denuncias
	JOIN
		vecinos
			ON vecinos.documento = denuncias.documento
	LEFT JOIN
		usuarios
			ON usuarios.vecino_documento = denuncias.documento
	LEFT JOIN
		tipo_usuario
			ON usuario_tipo_id = tipo_usuario.id
	LEFT JOIN
		sitios
			ON sitios.idSitio = denuncias.idSitio
	LEFT JOIN
		denuncias_detalles
			ON denuncias_detalles.idDenuncias = denuncias.idDenuncias
	WHERE
			((@owner IS NULL) OR (denuncias.documento = @owner))
		AND ((@idSitio IS NULL) OR (denuncias.idSitio = @idSitio))
		AND ((@descripcion IS NULL) OR (denuncias.descripcion = @descripcion))
		AND ((@estado IS NULL) OR (estado = @estado))
		AND ((@aceptaResponsabilidad IS NULL) OR (aceptaResponsabilidad = @aceptaResponsabilidad))
	ORDER BY 
		idDenuncias DESC
END;
GO
/****** Object:  StoredProcedure [dbo].[spBuscarSitio]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spBuscarSitio](
	@calle AS VARCHAR(150) = NULL,
	@numero AS VARCHAR(50) = NULL,
	@entreCalleA AS VARCHAR(150) = NULL,
	@entreCalleB AS VARCHAR(150) = NULL
)
AS
BEGIN
	SELECT *
	FROM 
		sitios
	WHERE
			((calle like '%' + @calle + '%') OR (@calle IS NULL))
		AND ((numero like '%' + @numero + '%') OR (@numero IS NULL))
		AND ((entreCalleA like '%' + @entreCalleA + '%') OR (@entreCalleA IS NULL))
		AND ((@entreCalleB like '%' + @entreCalleB + '%') OR (@entreCalleB IS NULL))
END;
GO
/****** Object:  StoredProcedure [dbo].[spCrearDenuncia]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[spCrearDenuncia] (
	@documento AS VARCHAR(20),
	@title AS VARCHAR(200) = NULL,
	@idSitio AS INT = NULL,
	@descripcion AS VARCHAR(2000) = NULL,
	@aceptaResponsabilidad AS INT
)
AS
BEGIN
	DECLARE @idDenuncia INT;
	BEGIN
		INSERT INTO denuncias VALUES (@documento, @idSitio, @descripcion, 'Creado', @aceptaResponsabilidad);
		SET @idDenuncia = @@IDENTITY;
		INSERT INTO denuncias_detalles VALUES (@idDenuncia, @title, SYSDATETIME())
	END

	SELECT 
		denuncias.idDenuncias AS id,
		titulo AS 'title',
		createDate AS 'creation_date',
		descripcion AS 'description',
		vecinos.documento AS 'owner',
		estado AS 'status'
	FROM
		denuncias
	JOIN vecinos 
		ON	denuncias.documento = vecinos.documento
	LEFT JOIN denuncias_detalles
		ON	denuncias_detalles.idDenuncias = denuncias.idDenuncias
	WHERE
		denuncias.idDenuncias = @idDenuncia;
END;
GO
/****** Object:  StoredProcedure [dbo].[spCrearReclamo]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE PROCEDURE [dbo].[spCrearReclamo](
	@documento AS VARCHAR(20),
	@idSitio AS INT,
	@idDesperfecto AS INT,
	@descripcionReclamo AS VARCHAR(1000),
	@latitud AS decimal(9,5) = NULL,
	@longitud AS decimal(9,5) = NULL,
	@calle AS VARCHAR(150) = NULL,
	@numero AS INT = NULL,
	@entreCalleA AS VARCHAR(150) = NULL,
	@entreCalleB AS VARCHAR(150) = NULL,
	@descripcionSitio AS VARCHAR(300) = NULL
)
AS
BEGIN
	DECLARE @idReclamo INT;
	BEGIN
		IF(@idSitio IS NULL)
			BEGIN
				IF(@calle IS NULL OR @numero IS NULL OR @calle = '' OR @numero = '')
					BEGIN
						SELECT 0 AS codigo, 'Debe especificar un valor para calle y numero' AS descripcion;
					END
				ELSE
					BEGIN
						EXEC spCrearSitio @latitud, @longitud, @calle, @numero, @entreCalleA, @entreCalleB, @descripcionSitio;
						SET @idSitio = @@IDENTITY;
					END
			END
	END
	BEGIN
		INSERT INTO 
			reclamos
			(documento, idSitio, idDesperfecto, descripcion, estado)
		VALUES (
			@documento,
			@idSitio,
			@idDesperfecto,
			@descripcionReclamo,
			'Creado'
		);
		SET @idReclamo = SCOPE_IDENTITY();
		SELECT 1 AS codigo, @idReclamo AS descripcion;
	END
END;
GO
/****** Object:  StoredProcedure [dbo].[spCrearSitio]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[spCrearSitio](
	@latitud AS decimal(9,5) = NULL,
	@longitud AS decimal(9,5) = NULL,
	@calle AS VARCHAR(150),
	@numero AS INT,
	@entreCalleA AS VARCHAR(150) = NULL,
	@entreCalleB AS VARCHAR(150) = NULL,
	@descripcion AS VARCHAR(300) = NULL,
	@aCargoDe AS VARCHAR(200) = NULL,
	@apertura AS TIME(7) = NULL,
	@cierre AS TIME(7) = NULL,
	@comentarios AS TEXT = NULL
)
AS
BEGIN
	DECLARE @idSitioExistente INT
	DECLARE @idSitioGenerado INT 

	SET @idSitioExistente = (
		SELECT 
			idSitio
		FROM 
			sitios
		WHERE
			calle = @calle
			AND numero = @numero
	)

	IF(@idSitioExistente IS NULL)
		BEGIN
			INSERT INTO sitios VALUES (@latitud, @longitud, @calle, @numero, @entreCalleA, @entreCalleB, @descripcion, @aCargoDe, @apertura, @cierre, @comentarios)
			SET @idSitioGenerado = SCOPE_IDENTITY()
			SELECT @idSitioGenerado AS idSitio
		END
	ELSE
		BEGIN
			SELECT @idSitioExistente AS idSitio
		END
END;
GO
/****** Object:  StoredProcedure [dbo].[spGenerarClave]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spGenerarClave] (
	@documento AS VARCHAR(20),
	@clave AS VARCHAR(100)
)
AS
BEGIN
	DECLARE @estado_solicitud int;

	SET @estado_solicitud = (SELECT TOP 1 estado_solicitud_id FROM solicitudes_claves WHERE vecino_documento = @documento ORDER BY id DESC);

	IF(@estado_solicitud = 2)
		BEGIN
			INSERT INTO usuarios VALUES (@documento, 1, @clave);
			UPDATE solicitudes_claves SET estado_solicitud_id = 4 WHERE vecino_documento = @documento;
			SELECT 1 AS codigo, 'La clave ha sido generada exitosamente' AS descripcion;
		END
	ELSE
		BEGIN
			SELECT 0 AS codigo, 'No existe ninguna solicitud de clave aprobada para poder generar la clave de acceso.' AS descripcion;
		END

END;
GO
/****** Object:  StoredProcedure [dbo].[spGetDesperfectos]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[spGetDesperfectos] (
	@descripcion AS VARCHAR(200) = NULL,
	@idRubro AS INT = NULL
)
AS
BEGIN
	SELECT idDesperfecto AS idDesperfecto, 
	desperfectos.descripcion AS desperfectos_descripcion, 
	rubros.idRubro AS idRubro,
	rubros.descripcion AS rubros_descripcion
	FROM desperfectos
	LEFT JOIN rubros on desperfectos.idRubro = rubros.idRubro
	WHERE
			((@descripcion IS NULL) OR (desperfectos.descripcion like '%' + @descripcion + '%'))
		AND ((@idRubro IS NULL) OR (desperfectos.idRubro = @idRubro))

	ORDER BY idDesperfecto ASC
END;
GO
/****** Object:  StoredProcedure [dbo].[spGetPromociones]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[spGetPromociones] (
	@idPromocion AS INT = NULL,
	@documento AS VARCHAR(20) = NULL,
	@cuit AS VARCHAR(50) = NULL,
	@nombre AS VARCHAR(200) = NULL,
	@tipo AS VARCHAR(50) = NULL,
	@rubro AS VARCHAR(50) = NULL,
	@horarios AS VARCHAR(200) = NULL,
	@descripcion AS VARCHAR(1000) = NULL
)
AS
BEGIN
	SELECT 
		*
	FROM
		promociones
	WHERE
		((@idPromocion IS NULL) OR (idPromocion = @idPromocion))
			AND ((@documento IS NULL) OR (documento = @documento))
			AND ((@cuit IS NULL) OR (cuit = @cuit))
			AND ((@nombre IS NULL) OR (nombre like '%' + @nombre + '%'))
			AND ((@tipo IS NULL) OR (tipo = @tipo))
			AND ((@rubro IS NULL) OR (rubro like '%' + @rubro + '%'))
			AND ((@horarios IS NULL) OR (horarios like '%' + @horarios + '%'))
			AND ((@descripcion IS NULL) OR (descripcion like '%' + @descripcion + '%'))
	ORDER BY 
		idPromocion DESC
END;
GO
/****** Object:  StoredProcedure [dbo].[spGetReclamos]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO







CREATE PROCEDURE [dbo].[spGetReclamos] (
	@idReclamo AS INT = NULL,
	@documento AS VARCHAR(20) = NULL,
	@idSitio AS INT = NULL,
	@idDesperfecto AS INT = NULL,
	@descripcion AS VARCHAR(1000) = NULL,
	@estado AS VARCHAR(30) = NULL
)
AS
BEGIN

	DECLARE @rol VARCHAR(50);
	SET @rol = (select tipo_usuario.nombre from usuarios join tipo_usuario on usuario_tipo_id = tipo_usuario.id WHERE usuarios.id = @idReclamo)

	BEGIN
		SELECT 
		idReclamo,
		documento,
		reclamos.descripcion as reclamo_descripcion,
		estado,
		IdReclamoUnificado,
		sitios.idSitio as idSitio,
		latitud,
		longitud,
		calle,
		numero,
		entreCalleA,
		entreCalleB,
		sitios.descripcion as sitio_descripcion, 
		aCargoDe,
		apertura,
		cierre,
		comentarios,
		desperfectos.idDesperfecto as idDesperfecto,
		desperfectos.descripcion as desperfecto_descripcion,
		rubros.idRubro as idRubro,
		rubros.descripcion as rubro_descripcion
		FROM reclamos
		JOIN sitios ON reclamos.idSitio = sitios.idSitio
		LEFT JOIN desperfectos ON reclamos.idDesperfecto = desperfectos.idDesperfecto
		LEFT JOIN rubros ON desperfectos.idRubro = rubros.idRubro
		WHERE
				((@descripcion IS NULL) OR (reclamos.descripcion like '%' + @descripcion + '%'))
			AND ((@idReclamo IS NULL) OR (idReclamo = @idReclamo))
			AND ((@documento IS NULL) OR (reclamos.documento = @documento))
			AND ((@idSitio IS NULL) OR (reclamos.idSitio = @idSitio))
			AND ((@idDesperfecto IS NULL) OR (reclamos.idDesperfecto = @idDesperfecto))
			AND ((@estado IS NULL) OR (reclamos.estado = @estado))
		ORDER BY idReclamo DESC
	END	
END;
GO
/****** Object:  StoredProcedure [dbo].[spGetRubros]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[spGetRubros] (
	@descripcion AS VARCHAR(200) = NULL
)
AS
BEGIN
	SELECT idRubro AS id, descripcion AS 'description'
	FROM
		rubros
	WHERE
			((@descripcion IS NULL) OR (descripcion like '%' + @descripcion + '%'))
END;
GO
/****** Object:  StoredProcedure [dbo].[spInsertarArchivoDenuncia]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[spInsertarArchivoDenuncia](
	@idDenuncias AS INT,
	@url AS VARCHAR(2000)
)
AS
BEGIN
	INSERT INTO 
		archivos_denuncias
	VALUES(@idDenuncias, @url);
	SELECT * FROM archivos_denuncias where id = @@IDENTITY;
END;
GO
/****** Object:  StoredProcedure [dbo].[spInsertarArchivoPromocion]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE PROCEDURE [dbo].[spInsertarArchivoPromocion](
	@idPromocion AS INT,
	@url AS VARCHAR(2000)
)
AS
BEGIN
	INSERT INTO 
		archivos_promociones
	VALUES(@idPromocion, @url);
	SELECT * FROM archivos_promociones where id = @@IDENTITY;
END;
GO
/****** Object:  StoredProcedure [dbo].[spInsertarArchivoReclamo]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[spInsertarArchivoReclamo](
	@idReclamo AS INT,
	@url AS VARCHAR(2000)
)
AS
BEGIN
	INSERT INTO 
		archivos_reclamos
	VALUES(@idReclamo, @url);
	SELECT * FROM archivos_reclamos where id = @@IDENTITY;
END;
GO
/****** Object:  StoredProcedure [dbo].[spInsertarArchivoReclamos]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[spInsertarArchivoReclamos](
	@idReclamo AS INT,
	@url AS VARCHAR(2000)
)
AS
BEGIN
	INSERT INTO archivos_reclamos VALUES(@idReclamo, @url);
	SELECT * FROM archivos_reclamos where id = @@IDENTITY;
END;
GO
/****** Object:  StoredProcedure [dbo].[spLogin]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spLogin] (
	@documento AS VARCHAR(20),
	@clave AS VARCHAR(100)
)
AS
BEGIN
	DECLARE @count int;
	SET @count = (SELECT COUNT(*) FROM usuarios WHERE usuarios.vecino_documento = @documento AND usuarios.password = @clave);

	IF(@count >= 1)
		BEGIN 
			SELECT TOP 1
				1 AS codigo,
				usuarios.id AS usuario_id, 
				vecinos.documento, 
				vecinos.apellido, 
				vecinos.nombre, 
				vecinos.direccion,
				barrios.nombre AS barrio,
				tipo_usuario.nombre AS rol
			FROM usuarios 
				JOIN vecinos 
					ON usuarios.vecino_documento = vecinos.documento 
				LEFT JOIN barrios 
					ON vecinos.codigoBarrio = barrios.idBarrio
				LEFT JOIN tipo_usuario
					ON usuarios.usuario_tipo_id = tipo_usuario.id
			WHERE 
				usuarios.vecino_documento = @documento 
				AND usuarios.password = @clave
			ORDER BY usuarios.id DESC
		END
	ELSE
		BEGIN 
			SELECT 0 AS codigo, 'Usuario y/o contraseña incorrecto' AS descripcion 
		END
END;
GO
/****** Object:  StoredProcedure [dbo].[spPostPromocion]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spPostPromocion] (
	@documento AS VARCHAR(20),
	@cuit AS VARCHAR(50) = NULL,
	@nombre AS VARCHAR(200) = NULL,
	@tipo AS VARCHAR(50) = NULL,
	@rubro AS VARCHAR(50) = NULL,
	@horarios AS VARCHAR(200) = NULL,
	@descripcion AS VARCHAR(1000) = NULL
)
AS
BEGIN
	DECLARE @idPromocion INT

	BEGIN TRAN
		BEGIN
			INSERT INTO promociones VALUES (@documento, @cuit, @nombre, @tipo, @rubro, @horarios, @descripcion);
			SET @idPromocion = @@IDENTITY;
		END
	COMMIT

	SELECT * FROM promociones WHERE idPromocion = @idPromocion;
END;
GO
/****** Object:  StoredProcedure [dbo].[spPostReclamo]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*DATOS OBLIGATORIOS:
	@documento
	@descripcion
	@sitio_calle
	@sitio_numero
	@desperfecto_descripcion
	@creaSitio
	@creaDesperfecto
*/
CREATE PROCEDURE [dbo].[spPostReclamo] (
	@documento AS VARCHAR(20), 
	@descripcion AS VARCHAR(1000),
	@sitio_idSitio AS INT = NULL,
	@sitio_latitud AS decimal(9,5) = NULL,
	@sitio_longitud AS decimal(9,5) = NULL,
	@sitio_calle AS VARCHAR(150),
	@sitio_numero AS int,
	@sitio_entreCalleA AS VARCHAR(150) = NULL,
	@sitio_entreCalleB AS VARCHAR(150) = NULL,
	@sitio_descripcion AS VARCHAR(300) = NULL,
	@sitio_aCargoDe AS VARCHAR(200) = NULL,
	@sitio_apertura AS TIME(7) = NULL,
	@sitio_cierre AS TIME(7) = NULL,
	@sitio_comentarios AS TEXT = NULL,
	@desperfecto_idDesperfecto AS INT = NULL,
	@desperfecto_descripcion AS VARCHAR(200),
	@creaSitio AS BIT,
	@creaDesperfecto AS BIT
)
AS
BEGIN
	DECLARE @idReclamo INT;

	IF(@creaSitio = 1)
	BEGIN
		BEGIN TRAN
		INSERT INTO sitios VALUES (@sitio_latitud, @sitio_longitud, @sitio_calle, @sitio_numero, @sitio_entreCalleA, @sitio_entreCalleB, @sitio_descripcion, @sitio_aCargoDe, @sitio_apertura, @sitio_cierre, @sitio_comentarios);
		SET @sitio_idSitio = @@IDENTITY;
		COMMIT
	END

	IF(@creaDesperfecto = 1)
	BEGIN
		BEGIN TRAN
		INSERT INTO desperfectos VALUES (@desperfecto_descripcion, NULL);
		SET @desperfecto_idDesperfecto = @@IDENTITY;
		COMMIT
	END

	BEGIN
		INSERT INTO reclamos VALUES (@documento, @sitio_idSitio, @desperfecto_idDesperfecto, @descripcion, 'Creado', NULL);
		SET @idReclamo = @@IDENTITY;
	END

	SELECT 1 as codigo, 
	'El reclamo ha sido creado con exito' as msg,
	@idReclamo as idReclamo
END;
GO
/****** Object:  StoredProcedure [dbo].[spRegistrarse]    Script Date: 7/8/2022 21:17:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spRegistrarse] (
	@dni AS VARCHAR(20), 
	@nombre AS VARCHAR(150) = NULL, 
	@apellido AS VARCHAR(150) = NULL, 
	@direccion AS VARCHAR(250) = NULL,
	@codigoBarrio AS INT = NULL,
	@email AS VARCHAR(100) = NULL,
	@password AS VARCHAR(100)
)
AS
BEGIN

	DECLARE @count_vecino int;
	DECLARE @count_solicitud int;

	SET @count_vecino = (
		SELECT COUNT(*)
		FROM vecinos
		WHERE vecinos.documento = @dni
	)

    BEGIN
		IF(@count_vecino >= 1)
			BEGIN 
				SET @count_solicitud = (SELECT COUNT(*) FROM solicitudes_claves WHERE solicitudes_claves.vecino_documento = @dni AND solicitudes_claves.estado_solicitud_id != 3);
				IF(@count_solicitud = 0)
					BEGIN
						INSERT INTO solicitudes_claves VALUES (@dni, 1, @email, @password)
						SELECT 1 AS codigo, vecinos.nombre, vecinos.apellido, tipo_usuario.nombre AS rol, vecinos.documento AS dni, 'Se ha registrado exitosamente! Debera esperar a que su solicitud de clave sea aprobada para poder acceder' as msg
						FROM vecinos JOIN tipo_usuario ON tipo_usuario.id = 1 WHERE vecinos.documento = @dni;
					END
				ELSE
					BEGIN
						SELECT 0 AS codigo, 'Ya existe una solicitud de clave para el documento ingresado. Por favor espere a recibir la notificacion de aprobacion del mismo. La misma puede tardar hasta 72hs habiles' AS descripcion;
					END
			END
		ELSE
			BEGIN
				SELECT 0 AS codigo, 'No existe un vecino con el documento ingresado' AS descripcion;
			END
	END

END;
GO
USE [master]
GO
ALTER DATABASE [Municipal_Test] SET  READ_WRITE 
GO
