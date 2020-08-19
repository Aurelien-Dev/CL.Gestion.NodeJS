# CL.Gestion.NodeJS


```sql
-- public.adhesion definition

-- Drop table

-- DROP TABLE public.adhesion;

CREATE TABLE public.adhesion (
	numero_sequence serial NOT NULL,
	date_debut date NOT NULL,
	date_fin date NOT NULL,
	montant_paye int4 NOT NULL,
	date_transaction date NOT NULL,
	type_transaction text NOT NULL,
	numero_sequence_membre int4 NOT NULL,
	etudiant bool NOT NULL,
	numero_sequence_type_adhesion int4 NOT NULL,
	commentaire varchar NULL,
	CONSTRAINT adhesion_pkey PRIMARY KEY (numero_sequence)
);


-- public.adhesion foreign keys

ALTER TABLE public.adhesion ADD CONSTRAINT adhesion_numero_sequence_membre_fkey FOREIGN KEY (numero_sequence_membre) REFERENCES membre(numero_sequence) ON DELETE SET NULL;
ALTER TABLE public.adhesion ADD CONSTRAINT adhesion_numero_sequence_type_adhesion_fkey FOREIGN KEY (numero_sequence_type_adhesion) REFERENCES type_adhesion(numero_sequence) ON DELETE SET NULL;
```