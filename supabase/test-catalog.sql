-- Seed catalog for the private production deployment.
-- Licensed instruments deliberately contain metadata only, never protected item text.

insert into public.test_definitions (slug, title, version, licensed, schema)
values
  (
    'ypi-1',
    'Inwentarz Osobowości Younga (YPI-1)',
    '1',
    true,
    '{"status":"license_required","items":72,"source":"Young / Schema Therapy"}'::jsonb
  ),
  (
    'ysq-s3',
    'Kwestionariusz Schematów Younga (YSQ-S3)',
    'S3',
    true,
    '{"status":"license_required","items":90,"source":"Young / Schema Therapy"}'::jsonb
  ),
  (
    'smi-1-1',
    'Inwentarz Trybów Schematów (SMI 1.1)',
    '1.1',
    true,
    '{"status":"license_required","items":124,"source":"Schema Therapy"}'::jsonb
  ),
  (
    'who-5',
    'Wskaźnik Dobrego Samopoczucia WHO-5',
    '2024-pl',
    false,
    '{"status":"ready","items":5,"source":"World Health Organization","license":"CC BY-NC-SA 3.0","source_url":"https://www.who.int/publications/m/item/WHO-UCN-MSD-MHE-2024.01"}'::jsonb
  ),
  (
    'phq-9',
    'Kwestionariusz Zdrowia Pacjenta PHQ-9',
    '9',
    false,
    '{"status":"polish_version_and_safety_flow_required","items":9,"source":"Pfizer / PHQ Screeners","source_url":"https://www.pfizer.com/contact/faqs"}'::jsonb
  ),
  (
    'audit',
    'Alcohol Use Disorders Identification Test (AUDIT)',
    '2',
    false,
    '{"status":"verified_polish_version_required","items":10,"source":"World Health Organization","source_url":"https://www.who.int/publications/i/item/audit-the-alcohol-use-disorders-identification-test-guidelines-for-use-in-primary-health-care"}'::jsonb
  ),
  (
    'asrs-v1-1-6q',
    'ASRS-v1.1 — wersja przesiewowa 6Q',
    '1.1',
    true,
    '{"status":"approved_polish_translation_required","items":6,"source":"NYU / Harvard National Comorbidity Survey","source_url":"https://www.hcp.med.harvard.edu/ncs/asrs.php"}'::jsonb
  ),
  (
    'pcl-5',
    'PTSD Checklist for DSM-5 (PCL-5)',
    'DSM-5',
    false,
    '{"status":"verified_polish_version_and_clinical_flow_required","items":20,"source":"U.S. Department of Veterans Affairs","public_domain":true,"source_url":"https://www.ptsd.va.gov/professional/assessment/adult-sr/ptsd-checklist.asp"}'::jsonb
  )
on conflict (slug) do update
set
  title = excluded.title,
  version = excluded.version,
  licensed = excluded.licensed,
  schema = excluded.schema;
