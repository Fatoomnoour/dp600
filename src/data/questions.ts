// Generated via converter.mjs — do not edit by hand.
import type { QuizQuestion } from "@/types/quiz";

export const QUESTIONS: QuizQuestion[] = [
 {
  "id": "q001",
  "number": 1,
  "category": "بنية",
  "question": "تحتاج Contoso ضمان التحكم بالإصدارات (version control) الذي يدعم branching للنماذج الدلالية والتقارير لقسم الأبحاث. ماذا تفعل؟",
  "explanation": "تكامل Git في Fabric هو الحل، وكان Azure Repos هو الموفر المدعوم وقت تأليف الامتحان (اليوم GitHub مدعوم أيضًا). التخزين في ADLS/OneDrive ليس تحكمًا بالإصدارات.",
  "reference": "https://learn.microsoft.com/en-us/fabric/cicd/git-integration/intro-to-git-integration",
  "images": [
   "/dp600/pages/p-004.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "تخزين النماذج والـreports في ADLS Gen2"
   },
   {
    "id": "oB",
    "text": "تعديل إعدادات مساحات الأبحاث لاستخدام مستودع GitHub"
   },
   {
    "id": "oC",
    "text": "تعديل إعدادات مساحات الأبحاث لاستخدام مستودع Azure Repos"
   },
   {
    "id": "oD",
    "text": "تخزين النماذج والـreports في Microsoft OneDrive"
   }
  ],
  "correctAnswers": [
   "oC"
  ]
 },
 {
  "id": "q002",
  "number": 2,
  "category": "بنية",
  "question": "تحتاج تجميع مساحات عمل قسم الأبحاث منطقيًا لتصفية OneLake data hub باسم القسم. ماذا تنشئ من Admin Portal؟",
  "explanation": "الـDomain في Fabric هي آلية تجميع مساحات العمل منطقيًا للتنقل والتصفية في OneLake Data Hub؛ تُنشأ من Admin portal.",
  "reference": "https://learn.microsoft.com/en-us/fabric/governance/domains",
  "images": [
   "/dp600/pages/p-005.png",
   "/dp600/pages/p-006.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Tenant"
   },
   {
    "id": "oB",
    "text": "Capacity"
   },
   {
    "id": "oC",
    "text": "Workspace Domain"
   },
   {
    "id": "oD",
    "text": "Security Group"
   }
  ],
  "correctAnswers": [
   "oC"
  ]
 },
 {
  "id": "q003",
  "number": 3,
  "category": "بيانات",
  "question": "لتقليل عدد الصفوف المُضافة عند تحديث جدول Orders (Import mode وOrderID تسلسلي)، ما الذي تضعه؟",
  "explanation": "التحميل التزايدي يسترجع أقصى OrderID الموجود حاليًا ثم يضيف الأحدث فقط — فيقل عدد الصفوف لأدنى حد.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-factory/dataflow-gen2-overview",
  "images": [
   "/dp600/pages/p-007.png",
   "/dp600/pages/p-008.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "ADF pipeline: Stored procedure لجلب أدنى OrderID"
   },
   {
    "id": "oB",
    "text": "ADF pipeline: Stored procedure لجلب أقصى OrderID"
   },
   {
    "id": "oC",
    "text": "ADF pipeline: dataflow لجلب أدنى OrderID"
   },
   {
    "id": "oD",
    "text": "ADF pipeline: dataflow لجلب أقصى OrderID"
   }
  ],
  "correctAnswers": [
   "oD"
  ]
 },
 {
  "id": "q004",
  "number": 4,
  "category": "بيانات",
  "question": "صيغة notebook للوصول لبيانات Productline1 عبر الاختصار ResearchProduct داخل Lakehouse1 (delta shortcut في قسم Tables)؟",
  "explanation": "الاختصار في قسم Tables يظهر كجدول في كتالوج lakehouse يُستعلم عبر spark.sql. الخياران C وD خاصان بقواعد KQL.",
  "reference": "https://learn.microsoft.com/en-us/fabric/onelake/onelake-shortcuts",
  "images": [
   "/dp600/pages/p-009.png",
   "/dp600/pages/p-010.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "spark.read.format(\"delta\").load(\"Tables/productline1/ResearchProduct\")"
   },
   {
    "id": "oB",
    "text": "spark.sql(\"SELECT * FROM Lakehouse1.ResearchProduct\")"
   },
   {
    "id": "oC",
    "text": "external_table('Tables/ResearchProduct')"
   },
   {
    "id": "oD",
    "text": "external_table(ResearchProduct)"
   }
  ],
  "correctAnswers": [
   "oB"
  ]
 },
 {
  "id": "q005",
  "number": 5,
  "category": "بيانات",
  "question": "اختر لكل دور الصلاحية الصحيحة عند مشاركة الـLakehouse:",
  "explanation": "مطابق لنموذج مشاركة Lakehouse: المهندسون = Read all Apache Spark، المحللون = Build reports، علماء البيانات = Read all SQL analytics endpoints data.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-sharing",
  "images": [
   "/dp600/pages/p-011.png",
   "/dp600/pages/p-012.png",
   "/dp600/pages/p-013.png",
   "/dp600/pages/p-014.png"
  ],
  "type": "dragDrop",
  "options": [],
  "dropZones": [
   {
    "id": "z0",
    "label": "الفراغ 1"
   },
   {
    "id": "z1",
    "label": "الفراغ 2"
   },
   {
    "id": "z2",
    "label": "الفراغ 3"
   }
  ],
  "dragItems": [
   {
    "id": "d0",
    "text": "Read all Apache Spark"
   },
   {
    "id": "d1",
    "text": "Read all SQL analytics endpoints data"
   },
   {
    "id": "d2",
    "text": "Read Data"
   },
   {
    "id": "d3",
    "text": "Build reports on the default semantic model"
   }
  ],
  "dragCorrect": {
   "z0": "",
   "z1": "",
   "z2": ""
  }
 },
 {
  "id": "q006",
  "number": 6,
  "category": "بيانات",
  "question": "مقياس DAX لمتوسط رضا العملاء (السؤال الثالث)، مقيدًا بآخر 12 شهرًا حتى تاريخ محدد.",
  "explanation": "استخدم AVERAGE على عمود النتيجة وقيّد بفلتر الفترة عبر CALCULATE.",
  "reference": "https://learn.microsoft.com/en-us/dax/average-function-dax",
  "images": [
   "/dp600/pages/p-015.png",
   "/dp600/pages/p-016.png",
   "/dp600/pages/p-017.png",
   "/dp600/pages/p-018.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "CALCULATE(AVERAGE('Survey'[Response Value]),…Period filter…)"
   },
   {
    "id": "oB",
    "text": "AVERAGE('Survey'[Response Value]) فقط"
   },
   {
    "id": "oC",
    "text": "CALCULATE(SUM('Survey'[Response Value]),…)"
   },
   {
    "id": "oD",
    "text": "AVERAGE('Satisfaction')"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q007",
  "number": 7,
  "category": "بيانات",
  "question": "توليد View في SQL تعرّف PricingGroup: low ≤50، medium >50 و≤1000، high >1000. أي CASE يحقق ذلك؟",
  "explanation": "المتطلب: 50 → low (فلا يصح BETWEEN 50 AND 1000 للأوسط)؛ الصحيح ≤50 low ثم 51–1000 medium.",
  "reference": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/case-transact-sql",
  "images": [
   "/dp600/pages/p-019.png",
   "/dp600/pages/p-020.png",
   "/dp600/pages/p-021.png",
   "/dp600/pages/p-022.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "CASE WHEN BETWEEN 50 AND 1000 THEN medium أولًا"
   },
   {
    "id": "oB",
    "text": "CASE: ≤50 low ثم BETWEEN 51 AND 1000 medium ثم high"
   },
   {
    "id": "oC",
    "text": "CASE WHEN =50 low مع medium>100"
   },
   {
    "id": "oD",
    "text": "CASE مختلط"
   }
  ],
  "correctAnswers": [
   "oB"
  ]
 },
 {
  "id": "q008",
  "number": 8,
  "category": "بيانات",
  "question": "ما الأداة الموصى بها لاستيعاب بيانات العملاء في مخزن بيانات AnalyticsPOC؟",
  "explanation": "dataflow (Power Query) هو أداة low-code الاستيعاب والتحويل في Fabric.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-factory/dataflow-gen2-overview",
  "images": [
   "/dp600/pages/p-023.png",
   "/dp600/pages/p-024.png",
   "/dp600/pages/p-025.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "stored procedure"
   },
   {
    "id": "oB",
    "text": "pipeline بنشاط KQL"
   },
   {
    "id": "oC",
    "text": "Spark notebook"
   },
   {
    "id": "oD",
    "text": "dataflow"
   }
  ],
  "correctAnswers": [
   "oD"
  ]
 },
 {
  "id": "q009",
  "number": 9,
  "category": "بنية",
  "question": "مخزن البيانات يجب أن يدعم T-SQL أو Python، بيانات شبه وغير مهيكلة، وRLS لمستخدمي T-SQL. ما النوع الأمثل؟",
  "explanation": "الـLakehouse يجمع جدول Delta (SQL analytics endpoint + T-SQL/RLS) وبيانات الملفات (Python/Spark) — الأنسب لكل المتطلبات.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-overview",
  "images": [
   "/dp600/pages/p-026.png",
   "/dp600/pages/p-027.png",
   "/dp600/pages/p-028.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "data lake"
   },
   {
    "id": "oB",
    "text": "warehouse"
   },
   {
    "id": "oC",
    "text": "lakehouse"
   },
   {
    "id": "oD",
    "text": "Hive metastore خارجي"
   }
  ],
  "correctAnswers": [
   "oC"
  ]
 },
 {
  "id": "q010",
  "number": 10,
  "category": "بيانات",
  "question": "استعلام T-SQL لبيانات 2023 بمجاميع أعلى من 10,000 (عرض ProductID وProductName). أي SELECT يطابق؟",
  "explanation": "WHERE DATEPART(YEAR, SaleDate)=2023 + GROUP BY ProductID, ProductName + HAVING SUM(Amount)>10000.",
  "reference": "https://learn.microsoft.com/en-us/sql/t-sql/queries/select-having-transact-sql",
  "images": [
   "/dp600/pages/p-029.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "SELECT ProductID, ProductName, SUM(Amount)…"
   },
   {
    "id": "oB",
    "text": "SELECT ProductID, ProductName WHERE 2023 فقط"
   },
   {
    "id": "oC",
    "text": "SELECT Name WHERE SUM 10000"
   },
   {
    "id": "oD",
    "text": "SELECT Name HAVING 10K دون فلترة"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q011",
  "number": 11,
  "category": "بيانات",
  "question": "أحدث سجل لكل عميل عبر ROW_NUMBER. أي بنية صحيحة؟",
  "explanation": "ROW_NUMBER على CustomerID مرتبًا بأحدث UpdatedTime DESC ثم WHERE rn=1 لإرجاع أحدث صف لكل عميل.",
  "reference": "https://learn.microsoft.com/en-us/sql/t-sql/functions/row-number-transact-sql",
  "images": [
   "/dp600/pages/p-030.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "ROW_NUMBER() OVER(PARTITION BY CustomerID ORDER BY UpdatedTime DESC) مع WHERE rn=1"
   },
   {
    "id": "oB",
    "text": "ROW_NUMBER() OVER(ORDER BY CustomerID)"
   },
   {
    "id": "oC",
    "text": "RANK() OVER()"
   },
   {
    "id": "oD",
    "text": "SELECT MAX(*)"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q012",
  "number": 12,
  "category": "بيانات",
  "question": "Hotspot أسفل معروض كود أول notebook ينشئ جدول Spark Delta.",
  "explanation": "الإجابة الصحيحة من ملف الـdump B — اتبع الشكل الصحيح لإنشاء جدول Delta من DataFrame بملف trong Tables.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-tables",
  "images": [
   "/dp600/pages/p-031.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Option A"
   },
   {
    "id": "oB",
    "text": "Option B"
   },
   {
    "id": "oC",
    "text": "Option C"
   },
   {
    "id": "oD",
    "text": "Option D"
   }
  ],
  "correctAnswers": [
   "oB"
  ]
 },
 {
  "id": "q013",
  "number": 13,
  "category": "بيانات",
  "question": "لديك lakehouse فيه Table1 (shortcut Delta)، Table2 (external Spark)، Table3 (managed). ماذا يمكنك عبر SQL endpoint؟",
  "explanation": "الجداول managed Delta تُقرأ فورًا عبر SQL endpoint؛ الاختصارات غير قابلة للتحديث عبره.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-sql-analytics-endpoint",
  "images": [
   "/dp600/pages/p-032.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "قراءة Table3"
   },
   {
    "id": "oB",
    "text": "تحديث بيانات Table3"
   },
   {
    "id": "oC",
    "text": "قراءة Table2"
   },
   {
    "id": "oD",
    "text": "تحديث بيانات Table1"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q014",
  "number": 14,
  "category": "بيانات",
  "question": "دالة Power Query لإظهار إحصاءات (min/max/avg/nulls) لكل عمود؟",
  "explanation": "Table.Profile يعيد جدول إحصاءات لكل عمود.",
  "reference": "https://learn.microsoft.com/en-us/powerquery-m/table-profile",
  "images": [
   "/dp600/pages/p-033.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Table.MaxN"
   },
   {
    "id": "oB",
    "text": "Table.Max"
   },
   {
    "id": "oC",
    "text": "Table.Range"
   },
   {
    "id": "oD",
    "text": "Table.Profile"
   }
  ],
  "correctAnswers": [
   "oD"
  ]
 },
 {
  "id": "q015",
  "number": 15,
  "category": "بيانات",
  "question": "أي لغتين لأداء scoring بنموذج مسجل عبر PREDICT داخل مصنف Fabric؟",
  "explanation": "PREDICT يعمل في مصنفات Spark عبر Spark SQL وPySpark.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-science/machine-learning-model",
  "images": [
   "/dp600/pages/p-033.png"
  ],
  "type": "multiple",
  "options": [
   {
    "id": "oA",
    "text": "T-SQL"
   },
   {
    "id": "oB",
    "text": "DAX"
   },
   {
    "id": "oC",
    "text": "Spark SQL"
   },
   {
    "id": "oD",
    "text": "PySpark"
   }
  ],
  "correctAnswers": [
   "oC",
   "oD"
  ]
 },
 {
  "id": "q016",
  "number": 16,
  "category": "بيانات",
  "question": "عرض DataFrame في Chart view بالمصنف لاستكشاف يدوي؟",
  "explanation": "display(df) تعرض الجدول التفاعلي مع Chart view.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/microsoft-fabric-notebooks",
  "images": [
   "/dp600/pages/p-034.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "displayHTML"
   },
   {
    "id": "oB",
    "text": "show"
   },
   {
    "id": "oC",
    "text": "write"
   },
   {
    "id": "oD",
    "text": "display"
   }
  ],
  "correctAnswers": [
   "oD"
  ]
 },
 {
  "id": "q017",
  "number": 17,
  "category": "نماذج",
  "question": "مرئي Python يجمع البيانات تلقائيًا ولا تظهر الأسطر المكررة. تحتاج ظهور كل الأسطر. ماذا تفعل؟",
  "explanation": "وثائق Microsoft الرسمية: أضف حقل فهرس فريد لكل صف يمنع التجميع. إجابة الملف (A) خاطئة.",
  "reference": "https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-python-visuals",
  "images": [
   "/dp600/pages/p-034.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "الإشارة للأعمدة بالفهرس"
   },
   {
    "id": "oB",
    "text": "تعديل Sort Column By"
   },
   {
    "id": "oC",
    "text": "إضافة حقل فريد لكل صف"
   },
   {
    "id": "oD",
    "text": "تعديل Summarize By"
   }
  ],
  "correctAnswers": [
   "oC"
  ]
 },
 {
  "id": "q018",
  "number": 18,
  "category": "نماذج",
  "question": "استعلام DAX عبر XMLA يعرض Stores المفلترة بتاريخ فتح > أول ديسمبر 2023.",
  "explanation": "استعلام DAX: DEFINE (للمقاييس) ثم EVALUATE مع SUMMARIZE/FILTER.",
  "reference": "https://learn.microsoft.com/en-us/dax/statements-dax",
  "images": [
   "/dp600/pages/p-034.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "DEFINE MEASURE + EVALUATE SUMMARIZE/FILTER…"
   },
   {
    "id": "oB",
    "text": "DIRECT SQL"
   },
   {
    "id": "oC",
    "text": "SELECT"
   },
   {
    "id": "oD",
    "text": "استدعاء نموذج ML"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q019",
  "number": 19,
  "category": "بيانات",
  "question": "في Power Query Profile لعمود pickupLongitude يظهر row count 2000 وdistinct count 1000. ماذا يستنتج؟",
  "explanation": "عدد المميز أقل من الإجمالي يعني وجود تكرار للقيم.",
  "reference": "https://learn.microsoft.com/en-us/power-query/data-profiling-tools",
  "images": [
   "/dp600/pages/p-035.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "العمود يحوي قيمًا مكررة"
   },
   {
    "id": "oB",
    "text": "العمود يحوي Missing فقط"
   },
   {
    "id": "oC",
    "text": "البيانات عيّنة جزئية"
   },
   {
    "id": "oD",
    "text": "العمود حسابي"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q020",
  "number": 20,
  "category": "نماذج",
  "question": "لضمان وصول قراءة/كتابة لـDS1 عبر XMLA endpoint، ما الذي تعدّله أولًا؟",
  "explanation": "XMLA = Read Write يُضبط على مستوى السعة.",
  "reference": "https://learn.microsoft.com/en-us/power-bi/enterprise/service-premium-connect-tools",
  "images": [
   "/dp600/pages/p-036.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "إعدادات DS1"
   },
   {
    "id": "oB",
    "text": "إعدادات WS1"
   },
   {
    "id": "oC",
    "text": "إعدادات السعة C1 (capacity)"
   },
   {
    "id": "oD",
    "text": "إعدادات المستأجر"
   }
  ],
  "correctAnswers": [
   "oC"
  ]
 },
 {
  "id": "q021",
  "number": 21,
  "category": "نماذج",
  "question": "لإنشاء ونشر نماذج Direct Lake مخصصة بأدوات خارجية بـleast privilege. أي ثلاثة إجراءات في Admin portal؟",
  "explanation": "أدوات خارجية تحتاج: XMLA مفعّل على Tenant، Read/Write على السعة، إنشاء عناصر Fabric للمستخدمين المعنيين.",
  "reference": "https://learn.microsoft.com/en-us/power-bi/enterprise/service-premium-connect-tools",
  "images": [
   "/dp600/pages/p-037.png"
  ],
  "type": "multiple",
  "options": [
   {
    "id": "oA",
    "text": "تفعيل Allow XMLA Endpoints (Tenant)"
   },
   {
    "id": "oB",
    "text": "Allow Azure AD guest users"
   },
   {
    "id": "oC",
    "text": "Users can edit data model"
   },
   {
    "id": "oD",
    "text": "Capacity XMLA = Read Write"
   },
   {
    "id": "oE",
    "text": "Users can create Fabric items"
   },
   {
    "id": "oF",
    "text": "Publish to Web"
   }
  ],
  "correctAnswers": [
   "oA",
   "oD",
   "oE"
  ]
 },
 {
  "id": "q022",
  "number": 22,
  "category": "نماذج",
  "question": "تنسيق ملف النموذج ليتحرر برمجيًا عبر TMDL (VS Code)؟",
  "explanation": ".pbip يحفظ التعريفات كملفات نصية تشمل .tmdl بهيكل مجلدات.",
  "reference": "https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-overview",
  "images": [
   "/dp600/pages/p-037.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "PBIP"
   },
   {
    "id": "oB",
    "text": "PBIX"
   },
   {
    "id": "oC",
    "text": "PBIT"
   },
   {
    "id": "oD",
    "text": "PBIDS"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q023",
  "number": 23,
  "category": "بيانات",
  "question": "منح صلاحية TRUNCATE لـUser1 على schemaA فقط بأقل امتياز. أي عبارة؟",
  "explanation": "TRUNCATE تتطلب ALTER؛ تفويضه على مستوى SCHEMA أقل امتيازًا.",
  "reference": "https://learn.microsoft.com/en-us/sql/t-sql/statements/truncate-table-transact-sql",
  "images": [
   "/dp600/pages/p-037.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "GRANT ALTER ON SCHEMA::schemaA TO User1"
   },
   {
    "id": "oB",
    "text": "GRANT INSERT ON schemaA::city TO User1"
   },
   {
    "id": "oC",
    "text": "GRANT CONTROL ON schemaA TO User1"
   },
   {
    "id": "oD",
    "text": "GRANT SELECT ON schemaA TO User1"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q024",
  "number": 24,
  "category": "بنية",
  "question": "deployment pipeline Dev→Test→Prod. المطورون ينشرون في Dev/Test دون Prod (least privilege). أي ثلاثة مستويات؟",
  "explanation": "Admin على الـpipeline، Contributor على Dev/Test، Viewer فقط على Prod.",
  "reference": "https://learn.microsoft.com/en-us/fabric/cicd/deployment-pipelines/understand-deployment-pipelines",
  "images": [
   "/dp600/pages/p-038.png"
  ],
  "type": "multiple",
  "options": [
   {
    "id": "oA",
    "text": "Build على نماذج Production"
   },
   {
    "id": "oB",
    "text": "Admin على الـpipeline"
   },
   {
    "id": "oC",
    "text": "Viewer Dev وTest"
   },
   {
    "id": "oD",
    "text": "Viewer Production"
   },
   {
    "id": "oE",
    "text": "Contributor Dev وTest"
   },
   {
    "id": "oF",
    "text": "Contributor Production"
   }
  ],
  "correctAnswers": [
   "oB",
   "oD",
   "oE"
  ]
 },
 {
  "id": "q025",
  "number": 25,
  "category": "نماذج",
  "question": "DirectQuery بـ500 مليون صف. أي ميزتين لتقليل استعلامات المرئيات؟",
  "explanation": "الـaggregations (المعرّفة يدويًا أو automatic في Premium) تلبّس DirectQuery.",
  "reference": "https://learn.microsoft.com/en-us/power-bi/transform-model/aggregations-advanced",
  "images": [
   "/dp600/pages/p-039.png"
  ],
  "type": "multiple",
  "options": [
   {
    "id": "oA",
    "text": "user-defined aggregations"
   },
   {
    "id": "oB",
    "text": "automatic aggregation"
   },
   {
    "id": "oC",
    "text": "query caching"
   },
   {
    "id": "oD",
    "text": "OneLake integration"
   }
  ],
  "correctAnswers": [
   "oA",
   "oB"
  ]
 },
 {
  "id": "q026",
  "number": 26,
  "category": "نماذج",
  "question": "تحديث تزايدي على CSV فشل لنفاد الموارد. السبب؟",
  "explanation": "التحديث التزايدي يحتاج query folding يدفع فلترة المصدر؛ CSV لا يدعم ذلك فيُحمّل كليًا وينفد الذاكرة.",
  "reference": "https://learn.microsoft.com/en-us/power-bi/connect-data/incremental-refresh-troubleshoot",
  "images": [
   "/dp600/pages/p-039.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "حدث query folding"
   },
   {
    "id": "oB",
    "text": "refresh complete days فقط"
   },
   {
    "id": "oC",
    "text": "XMLA = Read Only"
   },
   {
    "id": "oD",
    "text": "لا يحدث query folding"
   },
   {
    "id": "oE",
    "text": "تغير نوع عمود التقسيم"
   }
  ],
  "correctAnswers": [
   "oD"
  ]
 },
 {
  "id": "q027",
  "number": 27,
  "category": "نماذج",
  "question": "تفعيل scale-out لنموذج دلالي. ماذا أولًا؟",
  "explanation": "scale-out يتطلب تنسيق Large dataset format مفعّلًا على مستوى النموذج.",
  "reference": "https://learn.microsoft.com/en-us/power-bi/enterprise/service-premium-scale-out-configure",
  "images": [
   "/dp600/pages/p-040.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Large dataset storage = Off"
   },
   {
    "id": "oB",
    "text": "Create and use Metrics"
   },
   {
    "id": "oC",
    "text": "Large dataset storage = On"
   },
   {
    "id": "oD",
    "text": "Data Activator"
   }
  ],
  "correctAnswers": [
   "oC"
  ]
 },
 {
  "id": "q028",
  "number": 28,
  "category": "نماذج",
  "question": "warehouse يستخدم RLS ونموذج Direct Lake مبني على جداوله. بأي وضع تعمل استعلامات DAX؟",
  "explanation": "وثائق Microsoft: على مستودع Direct Lake توجد RLS → استعلامات DAX تتراجع إلى DirectQuery.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-warehouse/row-level-security",
  "images": [
   "/dp600/pages/p-040.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "DirectQuery"
   },
   {
    "id": "oB",
    "text": "Dual"
   },
   {
    "id": "oC",
    "text": "Direct Lake"
   },
   {
    "id": "oD",
    "text": "Import"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q029",
  "number": 29,
  "category": "نماذج",
  "question": "رسم تخطيطي يعرض Sales والمرتبطين فقط في Power BI Desktop؟",
  "explanation": "Model view يعرض المخطط مع إمكانية إخفاء الجداول.",
  "reference": "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-model-view",
  "images": [
   "/dp600/pages/p-041.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Data categories"
   },
   {
    "id": "oB",
    "text": "Data view"
   },
   {
    "id": "oC",
    "text": "Model view"
   },
   {
    "id": "oD",
    "text": "DAX query view"
   }
  ],
  "correctAnswers": [
   "oC"
  ]
 },
 {
  "id": "q030",
  "number": 30,
  "category": "نماذج",
  "question": "Direct Lake: تحديد الأعمدة المستخدمة كثيرًا والمحمّلة. ما الطريقتان؟",
  "explanation": "VertiPaq Analyzer + DMV مقاطع أعمدة التخزين يكشفان المحمّلة. DISCOVER_MEMORYGRANT عن منح الذاكرة لا عن الأعمدة.",
  "reference": "https://learn.microsoft.com/en-us/fabric/fundamentals/direct-lake-understand-storage",
  "images": [
   "/dp600/pages/p-041.png"
  ],
  "type": "multiple",
  "options": [
   {
    "id": "oA",
    "text": "Analyze in Excel"
   },
   {
    "id": "oB",
    "text": "VertiPaq Analyzer"
   },
   {
    "id": "oC",
    "text": "DMV $System.DISCOVER_STORAGE_TABLE_COLUMN_SEGMENTS"
   },
   {
    "id": "oD",
    "text": "DMV DISCOVER_MEMORYGRANT"
   }
  ],
  "correctAnswers": [
   "oB",
   "oC"
  ]
 },
 {
  "id": "q031",
  "number": 31,
  "category": "نماذج",
  "question": "نموذج أبعادي مع مصادر الطلبات (الشكل المعروض). كيف تبني الأبعاد؟",
  "explanation": "عادةً: CompanyID يندمج مع customer dimension وProductID مع product dimension (star schema).",
  "reference": "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema",
  "images": [
   "/dp600/pages/p-041.png",
   "/dp600/pages/p-042.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "علاقات مباشرة Customer↔Product"
   },
   {
    "id": "oB",
    "text": "CompanyID مفكك مع customer وProductID مفكك مع product"
   },
   {
    "id": "oC",
    "text": "دمج كل شيء في fact"
   },
   {
    "id": "oD",
    "text": "Items مفككة فقط"
   }
  ],
  "correctAnswers": [
   "oB"
  ]
 },
 {
  "id": "q032",
  "number": 32,
  "category": "نماذج",
  "question": "تقليل ذاكرة Model1 (100M صف Import) ووقت التحديث. الإجراءان الصحيحان؟",
  "explanation": "فصل datetime يقلل تكلفة التخزين، واستبدال بمقياس يمنع عمودًا محسوبًا إضافيًا.",
  "reference": "https://learn.microsoft.com/en-us/power-bi/guidance/import-modeling-data-reduction",
  "images": [
   "/dp600/pages/p-043.png"
  ],
  "type": "multiple",
  "options": [
   {
    "id": "oA",
    "text": "فصل OrderDateTime لتاريخ ووقت"
   },
   {
    "id": "oB",
    "text": "استبدال TotalQuantity بمحسوب"
   },
   {
    "id": "oC",
    "text": "تحويل Quantity إلى Text"
   },
   {
    "id": "oD",
    "text": "استبدال TotalSalesAmount بمقياس measure"
   }
  ],
  "correctAnswers": [
   "oA",
   "oD"
  ]
 },
 {
  "id": "q033",
  "number": 33,
  "category": "نماذج",
  "question": "منع منشئي التقارير من المقاييس الضمنية. أداتان؟",
  "explanation": "إخفاء الأعمدة لتعطيل المقاييس الضمنية في Power BI Desktop وTabular Editor.",
  "reference": "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-structure-pivot",
  "images": [
   "/dp600/pages/p-043.png"
  ],
  "type": "multiple",
  "options": [
   {
    "id": "oA",
    "text": "Power BI Desktop"
   },
   {
    "id": "oB",
    "text": "Tabular Editor"
   },
   {
    "id": "oC",
    "text": "SSMS"
   },
   {
    "id": "oD",
    "text": "DAX Studio"
   }
  ],
  "correctAnswers": [
   "oA",
   "oB"
  ]
 },
 {
  "id": "q034",
  "number": 34,
  "category": "بيانات",
  "question": "تقييم query folding من المعروض (خطوات متعددة من dataflow لـSQL). الاستنتاج؟",
  "explanation": "إذا لم تُترجم كل الخطوات للمصدر فتبقى الأخيرة على Power Query engine = \"Some steps\".",
  "reference": "https://learn.microsoft.com/en-us/power-query/query-folding-basics",
  "images": [
   "/dp600/pages/p-044.png",
   "/dp600/pages/p-045.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "All steps folded"
   },
   {
    "id": "oB",
    "text": "Some steps folded (Microsoft Power Query engine للخطوة الأخيرة)"
   },
   {
    "id": "oC",
    "text": "No folding"
   },
   {
    "id": "oD",
    "text": "Always translated"
   }
  ],
  "correctAnswers": [
   "oB"
  ]
 },
 {
  "id": "q035",
  "number": 35,
  "category": "بيانات",
  "question": "في Copy data لاستبدال مخطط Table1 وكل البيانات (مخطط متغير دوريًا). إعدادات الوجهة؟",
  "explanation": "Overwrite يعيد إنشاء الجدول مع المخطط والبيانات الجديدة.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-factory/copy-activity",
  "images": [
   "/dp600/pages/p-046.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Source: إضافة أعمدة"
   },
   {
    "id": "oB",
    "text": "Destination: Table action = Overwrite"
   },
   {
    "id": "oC",
    "text": "Settings: Enable staging"
   },
   {
    "id": "oD",
    "text": "Source: Enable partition discovery"
   },
   {
    "id": "oE",
    "text": "Source: Recursively"
   }
  ],
  "correctAnswers": [
   "oB"
  ]
 },
 {
  "id": "q036",
  "number": 36,
  "category": "بيانات",
  "question": "الاستعلام عن ملفات Amazon S3 عبر SQL endpoint. توصيتان (التنسيق والمكان)؟",
  "explanation": "Parquet محسّن للتحليلات، واختصار في Tables يسجّل البيانات كجدول عبر SQL endpoint.",
  "reference": "https://learn.microsoft.com/en-us/fabric/onelake/create-s3-shortcut",
  "images": [
   "/dp600/pages/p-047.png"
  ],
  "type": "multiple",
  "options": [
   {
    "id": "oA",
    "text": "shortcut في Files"
   },
   {
    "id": "oB",
    "text": "Parquet"
   },
   {
    "id": "oC",
    "text": "CSV"
   },
   {
    "id": "oD",
    "text": "shortcut في Tables"
   },
   {
    "id": "oE",
    "text": "delta"
   }
  ],
  "correctAnswers": [
   "oB",
   "oD"
  ]
 },
 {
  "id": "q037",
  "number": 37,
  "category": "بيانات",
  "question": "تحويل CSV في Lakehouse إلى Delta مع V-Order. الإجراء من Lakehouse explorer؟",
  "explanation": "Load to Tables تحمّل CSV كجداول Delta مع V-Order تلقائيًا.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/load-to-tables",
  "images": [
   "/dp600/pages/p-047.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Load to Tables"
   },
   {
    "id": "oB",
    "text": "shortcut جديد في Files"
   },
   {
    "id": "oC",
    "text": "shortcut جديد في Tables"
   },
   {
    "id": "oD",
    "text": "Optimize"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q038",
  "number": 38,
  "category": "بيانات",
  "question": "تحديد عمود التقسيم في Destination لـCopy activity. ماذا أولًا؟",
  "explanation": "خيار Partition column في Destination يظهر فقط في وضع Overwrite.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-factory/copy-activity",
  "images": [
   "/dp600/pages/p-048.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Destination: Mode = Append"
   },
   {
    "id": "oB",
    "text": "Destination: تحديد عمود التقسيم"
   },
   {
    "id": "oC",
    "text": "Source: Enable partition discovery"
   },
   {
    "id": "oD",
    "text": "Destination: Mode = Overwrite"
   }
  ],
  "correctAnswers": [
   "oD"
  ]
 },
 {
  "id": "q039",
  "number": 39,
  "category": "بيانات",
  "question": "تنفيذ CREATE TABLE test.FactSales AS CLONE OF dbo.FactSales — نسخة مستقلة وفورية؟",
  "explanation": "CLONE ينسخ البيانات الوصفية فقط (point-in-time) ويكون مستقلًا (لا يرث التغييرات اللاحقة).",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-warehouse/clone-table",
  "images": [
   "/dp600/pages/p-048.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "نعم — نسخة metadata فقط بدون نسخ البيانات"
   },
   {
    "id": "oB",
    "text": "لا — تتضمن نسخ البيانات"
   },
   {
    "id": "oC",
    "text": "نسخ ومزامنة كاملة"
   },
   {
    "id": "oD",
    "text": "CLONE غير مدعوم"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q040",
  "number": 40,
  "category": "بيانات",
  "question": "حل يدعم dataflows + V-Order وcompaction تلقائي على Delta. مخزن بيانات؟",
  "explanation": "جداول Delta في OneLake تُحسَّن (V-Order) وتُضغط تلقائيًا — في lakehouse فقط.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-overview",
  "images": [
   "/dp600/pages/p-049.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "lakehouse"
   },
   {
    "id": "oB",
    "text": "Azure SQL database"
   },
   {
    "id": "oC",
    "text": "warehouse"
   },
   {
    "id": "oD",
    "text": "KQL database"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q041",
  "number": 41,
  "category": "بيانات",
  "question": "كود Spark df.write.mode(\"overwrite\").partitionBy(...).parquet(\"Files/SalesOrder\"). ينتج؟",
  "explanation": "الكتابة إلى Files/ تنتج ملفات Parquet بطبقات يومية لا تظهر تلقائيًا كجدول في Lakehouse explorer.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-notebook-exploration",
  "images": [
   "/dp600/pages/p-049.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Parquet مقسّم يوميًا (بيانات غير مُدارة)"
   },
   {
    "id": "oB",
    "text": "جداول Delta"
   },
   {
    "id": "oC",
    "text": "ملفات CSV"
   },
   {
    "id": "oD",
    "text": "Parquet دون تقسيم"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q042",
  "number": 42,
  "category": "بيانات",
  "question": "تحويل أعمدة إلى صفوف مع إبقاء عمود VendorID. أي تحويل؟",
  "explanation": "Unpivot other columns يقلب الأعمدة الأخرى مع إبقاء VendorID.",
  "reference": "https://learn.microsoft.com/en-us/power-query/unpivot-column",
  "images": [
   "/dp600/pages/p-050.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Group by"
   },
   {
    "id": "oB",
    "text": "Unpivot columns"
   },
   {
    "id": "oC",
    "text": "Unpivot other columns"
   },
   {
    "id": "oD",
    "text": "Split column"
   },
   {
    "id": "oE",
    "text": "Remove other columns"
   }
  ],
  "correctAnswers": [
   "oC"
  ]
 },
 {
  "id": "q043",
  "number": 43,
  "category": "بيانات",
  "question": "جدولة pipeline كل 4 ساعات يومي الاثنين والجمعة. Repeat؟",
  "explanation": "Weekly تختار أيام الأسبوع ثم 6 أوقات يومية بفارق 4 ساعات.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-factory/pipeline-schedule",
  "images": [
   "/dp600/pages/p-051.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Daily"
   },
   {
    "id": "oB",
    "text": "By the minute"
   },
   {
    "id": "oC",
    "text": "Weekly"
   },
   {
    "id": "oD",
    "text": "Hourly"
   }
  ],
  "correctAnswers": [
   "oC"
  ]
 },
 {
  "id": "q044",
  "number": 44,
  "category": "بنية",
  "question": "استعلامات المستودع تتدهور وتشك بالخنق. التطبيق المستخدم للكشف؟",
  "explanation": "Capacity Metrics app يعرض CU/timepoints وأحداث الاختناق.",
  "reference": "https://learn.microsoft.com/en-us/fabric/admin/metrics-app",
  "images": [
   "/dp600/pages/p-052.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Capacity settings"
   },
   {
    "id": "oB",
    "text": "Monitoring hub"
   },
   {
    "id": "oC",
    "text": "DMVs"
   },
   {
    "id": "oD",
    "text": "Microsoft Fabric Capacity Metrics app"
   }
  ],
  "correctAnswers": [
   "oD"
  ]
 },
 {
  "id": "q045",
  "number": 45,
  "category": "بيانات",
  "question": "كود notebook يقرأ CSV ويكتب إلى Lakehouse مع تحويلات (المعروض). هل الملفات تظهر تلقائيًا كجدول؟",
  "explanation": "الكتابة إلى Files/ لا تظهر تلقائيًا كجدول — يجب الكتابة في Tables/ بصيغة Delta.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-notebook-exploration",
  "images": [
   "/dp600/pages/p-052.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "نعم"
   },
   {
    "id": "oB",
    "text": "لا"
   }
  ],
  "correctAnswers": [
   "oB"
  ]
 },
 {
  "id": "q046",
  "number": 46,
  "category": "بيانات",
  "question": "استعلام يستغرق 45 دقيقة ولم يكتمل. أي DMV يحدد السبب؟",
  "explanation": "sys.dm_exec_requests يعرض حالة الطلبات الجارية وحالة الانتظار.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-warehouse/monitor-using-dmv",
  "images": [
   "/dp600/pages/p-053.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "sys.dm_exec_requests"
   },
   {
    "id": "oB",
    "text": "sys.dm_exec_sessions"
   },
   {
    "id": "oC",
    "text": "sys.dm_exec_connections"
   },
   {
    "id": "oD",
    "text": "sys.dm_pdw_exec_requests"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q047",
  "number": 47,
  "category": "بيانات",
  "question": "إجبار query folding للقارئ Power Query على SQL Server. أي كود؟",
  "explanation": "Value.NativeQuery مع EnableFolding=true يجعل التعبير Boolean يُدفع للمصدر.",
  "reference": "https://learn.microsoft.com/en-us/power-query/native-query-folding",
  "images": [
   "/dp600/pages/p-054.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Value.NativeQuery مع EnableFolding=true"
   },
   {
    "id": "oB",
    "text": "SQL.NativeQuery مع EnableFolding"
   },
   {
    "id": "oC",
    "text": "Enable folding=false"
   },
   {
    "id": "oD",
    "text": "لا يوجد"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q048",
  "number": 48,
  "category": "بيانات",
  "question": "استراتيجية صيانة Delta: دمج الملفات الصغيرة ~1GB وحذف ما لم يعد مرجعيًا. الترتيب الصحيح؟",
  "explanation": "OPTIMIZE يدمج الملفات الصغيرة، ثم VACUUM يحذف الملفات غير المرجعية.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/delta-optimize-vacuum",
  "images": [
   "/dp600/pages/p-055.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "OPTIMIZE ثم VACUUM"
   },
   {
    "id": "oB",
    "text": "VACUUM ثم OPTIMIZE"
   },
   {
    "id": "oC",
    "text": "OPTIMIZE فقط"
   },
   {
    "id": "oD",
    "text": "VACUUM فقط"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q049",
  "number": 49,
  "category": "بيانات",
  "question": "SCD نوع 1. إجراءان صحيحان؟",
  "explanation": "SCD1 = كتابة فوق: تحديث السمات + إدراج سجل لمفتاح جديد. الخياران الآخران لـSCD2.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-warehouse/slowly-changing-dimension",
  "images": [
   "/dp600/pages/p-056.png"
  ],
  "type": "multiple",
  "options": [
   {
    "id": "oA",
    "text": "تحديث الصفوف عند تغير السمات غير المفتاحية"
   },
   {
    "id": "oB",
    "text": "إدراج صفوف عند تغير المفتاح الطبيعي في صف موجود"
   },
   {
    "id": "oC",
    "text": "تحديث تاريخ نهاية السريان"
   },
   {
    "id": "oD",
    "text": "إدراج سجلات لمفتاح طبيعي جديد"
   }
  ],
  "correctAnswers": [
   "oA",
   "oD"
  ]
 },
 {
  "id": "q050",
  "number": 50,
  "category": "بيانات",
  "question": "اختصار ADLS Gen2 data في Lakehouse. أي توليفة endpoint/path صحيحة؟",
  "explanation": "وثائق Microsoft: استخدم endpoint .dfs وprotocol https://…dfs.core.windows.net… وليس .blob.",
  "reference": "https://learn.microsoft.com/en-us/fabric/onelake/create-adls-shortcut",
  "images": [
   "/dp600/pages/p-057.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "endpoint=dfs"
   },
   {
    "id": "oB",
    "text": "endpoint=blob"
   },
   {
    "id": "oC",
    "text": "endpoint=dfs + https://…dfs.core.windows.net/…"
   },
   {
    "id": "oD",
    "text": "endpoint=dfs بدون path"
   }
  ],
  "correctAnswers": [
   "oC"
  ]
 },
 {
  "id": "q051",
  "number": 51,
  "category": "بيانات",
  "question": "ضم transactions (10M) مع customers (1000) مع تقليل shuffling. الكود؟",
  "explanation": "broadcast join يلغي shuffle عبر توزيع الجدول الصغير على المنفذين.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/spark-join-optimization",
  "images": [
   "/dp600/pages/p-058.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "transactions.join(F.broadcast(customers), …)"
   },
   {
    "id": "oB",
    "text": "transactions.join(customers, …).distinct()"
   },
   {
    "id": "oC",
    "text": "transactions.join(customers, …)"
   },
   {
    "id": "oD",
    "text": "transactions.crossJoin(customers).where(…)"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q052",
  "number": 52,
  "category": "نماذج",
  "question": "Performance analyzer لنموذج Direct Lake: الاستعلام يظهر بالوضع؟",
  "explanation": "استعلامات Direct Lake الناجحة تُظهر Direct Lake؛ التراجع التلقائي (Automatic) عند عدم الدعم.",
  "reference": "https://learn.microsoft.com/en-us/fabric/fundamentals/direct-lake-overview",
  "images": [
   "/dp600/pages/p-058.png",
   "/dp600/pages/p-059.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Automatic fallback"
   },
   {
    "id": "oB",
    "text": "Direct Lake"
   },
   {
    "id": "oC",
    "text": "DirectQuery"
   },
   {
    "id": "oD",
    "text": "Import"
   }
  ],
  "correctAnswers": [
   "oB"
  ]
 },
 {
  "id": "q053",
  "number": 53,
  "category": "بيانات",
  "question": "أكمل كود PySpark لتحويل pickupDateTime إلى تاريخ وتصفية fareAmount بين 0 و100:",
  "explanation": "df.withColumn(\"pickupDate\", col(\"pickupDateTime\").cast(\"date\")).filter(\"fareAmount > 0 AND fareAmount < 100\").",
  "reference": "https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.DataFrame.withColumn.html",
  "images": [
   "/dp600/pages/p-060.png",
   "/dp600/pages/p-061.png"
  ],
  "type": "dragDrop",
  "options": [],
  "dropZones": [
   {
    "id": "z0",
    "label": "الفراغ 1"
   },
   {
    "id": "z1",
    "label": "الفراغ 2"
   }
  ],
  "dragItems": [
   {
    "id": "d0",
    "text": "withColumn"
   },
   {
    "id": "d1",
    "text": "select"
   },
   {
    "id": "d2",
    "text": "filter"
   },
   {
    "id": "d3",
    "text": "cast"
   },
   {
    "id": "d4",
    "text": "'date'"
   },
   {
    "id": "d5",
    "text": "'string'"
   },
   {
    "id": "d6",
    "text": "'int'"
   },
   {
    "id": "d7",
    "text": "'datetime'"
   }
  ],
  "dragCorrect": {
   "z0": "",
   "z1": ""
  }
 },
 {
  "id": "q054",
  "number": 54,
  "category": "بيانات",
  "question": "حدد صح أم خطأ (نعم/لا) لكل عبارة من العبارات التالية:",
  "explanation": "explain() يعرض خطة التنفيذ لا إحصاءات — استخدم summary()/describe().",
  "reference": "https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.DataFrame.summary.html",
  "images": [
   "/dp600/pages/p-062.png"
  ],
  "type": "yesNo",
  "statements": [
   {
    "id": "s0",
    "text": "هل يحقق df.explain() الهدف (min/max/mean/stddev)؟",
    "correctAnswer": ""
   }
  ]
 },
 {
  "id": "q055",
  "number": 55,
  "category": "بيانات",
  "question": "حدد صح أم خطأ (نعم/لا) لكل عبارة من العبارات التالية:",
  "explanation": "show() يعرض الصفوف لا إحصاءات.",
  "reference": "https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.DataFrame.show.html",
  "images": [
   "/dp600/pages/p-062.png"
  ],
  "type": "yesNo",
  "statements": [
   {
    "id": "s0",
    "text": "هل يحقق df.show() الهدف الإحصائي؟",
    "correctAnswer": ""
   }
  ]
 },
 {
  "id": "q056",
  "number": 56,
  "category": "بيانات",
  "question": "حدد صح أم خطأ (نعم/لا) لكل عبارة من العبارات التالية:",
  "explanation": "summary() يعيد count/mean/stddev/min/max.",
  "reference": "https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.DataFrame.summary.html",
  "images": [
   "/dp600/pages/p-063.png"
  ],
  "type": "yesNo",
  "statements": [
   {
    "id": "s0",
    "text": "هل تحقق df.summary() الهدف (count/mean/stddev/min/max)؟",
    "correctAnswer": ""
   }
  ]
 },
 {
  "id": "q057",
  "number": 57,
  "category": "بيانات",
  "question": "حدد صح أم خطأ (نعم/لا) لكل عبارة من العبارات التالية:",
  "explanation": "DESCRIBE HISTORY يعرض سجل العمليات.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/delta-table-history",
  "images": [
   "/dp600/pages/p-063.png"
  ],
  "type": "yesNo",
  "statements": [
   {
    "id": "s0",
    "text": "هل يكشف DESCRIBE HISTORY customer تنفيذ OPTIMIZE/VACUUM؟",
    "correctAnswer": ""
   }
  ]
 },
 {
  "id": "q058",
  "number": 58,
  "category": "بيانات",
  "question": "حدد صح أم خطأ (نعم/لا) لكل عبارة من العبارات التالية:",
  "explanation": "REFRESH TABLE يحدّث الميتاداتا لا سجل الصيانة.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/delta-table-history",
  "images": [
   "/dp600/pages/p-064.png"
  ],
  "type": "yesNo",
  "statements": [
   {
    "id": "s0",
    "text": "هل يكشف REFRESH TABLE customer تنفيذ OPTIMIZE/VACUUM؟",
    "correctAnswer": ""
   }
  ]
 },
 {
  "id": "q059",
  "number": 59,
  "category": "بيانات",
  "question": "حدد صح أم خطأ (نعم/لا) لكل عبارة من العبارات التالية:",
  "explanation": "EXPLAIN TABLE يعرض خطة تنفيذ لا سجل صيانة.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/delta-table-history",
  "images": [
   "/dp600/pages/p-064.png"
  ],
  "type": "yesNo",
  "statements": [
   {
    "id": "s0",
    "text": "هل يكشف EXPLAIN TABLE customer تنفيذ OPTIMIZE/VACUUM؟",
    "correctAnswer": ""
   }
  ]
 },
 {
  "id": "q060",
  "number": 60,
  "category": "بنية",
  "question": "تهيئة المستأجر لـPoC (مجموعة محددة فقط). أي إجراءين من Admin portal؟",
  "explanation": "التجربة والإنشاء لمجموعات محددة فقط (least privilege).",
  "reference": "https://learn.microsoft.com/en-us/fabric/admin/fabric-switch",
  "images": [
   "/dp600/pages/p-064.png",
   "/dp600/pages/p-065.png",
   "/dp600/pages/p-066.png",
   "/dp600/pages/p-067.png"
  ],
  "type": "multiple",
  "options": [
   {
    "id": "oA",
    "text": "Users can try Fabric paid features للمؤسسة كلها"
   },
   {
    "id": "oB",
    "text": "Users can try Fabric paid features لمجموعات محددة"
   },
   {
    "id": "oC",
    "text": "Allow Azure AD guest"
   },
   {
    "id": "oD",
    "text": "Users can create Fabric items مع استثناء"
   },
   {
    "id": "oE",
    "text": "Users can create Fabric items لمجموعات محددة"
   }
  ],
  "correctAnswers": [
   "oB",
   "oE"
  ]
 },
 {
  "id": "q061",
  "number": 61,
  "category": "نماذج",
  "question": "مصادقة ووضع توصيل نموذج رضا العملاء (تحديث فوري + RLS). أي وضعان؟",
  "explanation": "SSO يحقق احترام RLS بمستوى المستخدم، وDirect Lake يقرأ من delta فورًا بأداء عالٍ.",
  "reference": "https://learn.microsoft.com/en-us/fabric/fundamentals/direct-lake-overview",
  "images": [
   "/dp600/pages/p-068.png",
   "/dp600/pages/p-069.png",
   "/dp600/pages/p-070.png",
   "/dp600/pages/p-071.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "SSO + Direct Lake"
   },
   {
    "id": "oB",
    "text": "SSO + Import"
   },
   {
    "id": "oC",
    "text": "Anonymous + DirectQuery"
   },
   {
    "id": "oD",
    "text": "Shared Account + Import"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q062",
  "number": 62,
  "category": "بيانات",
  "question": "تنفيذ بُعد تاريخ 2010–نهاية العام الحالي دون مصدر بيانات. طريقتان؟",
  "explanation": "لا مصدر للنسخ (يستبعد Copy) والمطلوب جدول لا view — التوليد عبر dataflow أو stored procedure.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-warehouse/data-validation",
  "images": [
   "/dp600/pages/p-072.png",
   "/dp600/pages/p-073.png",
   "/dp600/pages/p-074.png",
   "/dp600/pages/p-075.png"
  ],
  "type": "multiple",
  "options": [
   {
    "id": "oA",
    "text": "dataflow"
   },
   {
    "id": "oB",
    "text": "Copy activity"
   },
   {
    "id": "oC",
    "text": "T-SQL view"
   },
   {
    "id": "oD",
    "text": "Stored procedure activity"
   }
  ],
  "correctAnswers": [
   "oA",
   "oD"
  ]
 },
 {
  "id": "q063",
  "number": 63,
  "category": "بيانات",
  "question": "ضمان تنفيذ أنشطة التحميل بالتسلسل ثم تعبئة النموذج الأبعادي. ماذا تفعل؟",
  "explanation": "التبعيات والتنفيذ المشروط تكون في pipeline فقط.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-factory/activity-overview",
  "images": [
   "/dp600/pages/p-076.png",
   "/dp600/pages/p-077.png",
   "/dp600/pages/p-078.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "dataflow بخطوات وجدولته"
   },
   {
    "id": "oB",
    "text": "Spark notebook وجدولته"
   },
   {
    "id": "oC",
    "text": "Spark job definition وجدولته"
   },
   {
    "id": "oD",
    "text": "pipeline بتبعيات بين الأنشطة وجدولته"
   }
  ],
  "correctAnswers": [
   "oD"
  ]
 },
 {
  "id": "q064",
  "number": 64,
  "category": "بنية",
  "question": "سعة Fabric مخصصة عند الطلب بفوترة بالدقيقة لقسم الأبحاث. SKU؟",
  "explanation": "عائلة F تدعم Pay-as-you-go بالدقيقة.",
  "reference": "https://learn.microsoft.com/en-us/fabric/enterprise/licenses",
  "images": [
   "/dp600/pages/p-079.png",
   "/dp600/pages/p-080.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "A"
   },
   {
    "id": "oB",
    "text": "EM"
   },
   {
    "id": "oC",
    "text": "P"
   },
   {
    "id": "oD",
    "text": "F"
   }
  ],
  "correctAnswers": [
   "oD"
  ]
 },
 {
  "id": "q065",
  "number": 65,
  "category": "بيانات",
  "question": "أكمل كود هجرة بيانات Productline1 لتظهر كجدول مُدار:",
  "explanation": "الكتابة على Tables/Productline1 بصيغة delta تجعلها Managed table تظهر تلقائيًا.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-tables",
  "images": [
   "/dp600/pages/p-081.png",
   "/dp600/pages/p-082.png",
   "/dp600/pages/p-083.png"
  ],
  "type": "dragDrop",
  "options": [],
  "dropZones": [
   {
    "id": "z0",
    "label": "الفراغ 1"
   },
   {
    "id": "z1",
    "label": "الفراغ 2"
   }
  ],
  "dragItems": [
   {
    "id": "d0",
    "text": "delta"
   },
   {
    "id": "d1",
    "text": "parquet"
   },
   {
    "id": "d2",
    "text": "csv"
   },
   {
    "id": "d3",
    "text": "avro"
   },
   {
    "id": "d4",
    "text": "Tables/Productline1"
   },
   {
    "id": "d5",
    "text": "Files/productline1"
   },
   {
    "id": "d6",
    "text": "Table1"
   },
   {
    "id": "d7",
    "text": "Files/Productline1"
   }
  ],
  "dragCorrect": {
   "z0": "",
   "z1": ""
  }
 },
 {
  "id": "q066",
  "number": 66,
  "category": "نماذج",
  "question": "أداة تنفيذ calculation groups في نماذج قسم الأبحاث؟",
  "explanation": "لا تُنشأ من Desktop أو الخدمة — Tabular Editor عبر XMLA.",
  "reference": "https://learn.microsoft.com/en-us/power-bi/transform-model/calculation-groups",
  "images": [
   "/dp600/pages/p-084.png",
   "/dp600/pages/p-085.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Power BI Desktop"
   },
   {
    "id": "oB",
    "text": "Power BI service"
   },
   {
    "id": "oC",
    "text": "DAX Studio"
   },
   {
    "id": "oD",
    "text": "Tabular Editor"
   }
  ],
  "correctAnswers": [
   "oD"
  ]
 },
 {
  "id": "q067",
  "number": 67,
  "category": "بنية",
  "question": "أدوار مساحات العمل: Group1 يقرأ عبر SQL endpoints وGroup2 يقرأ عبر Lakehouse explorer؟",
  "explanation": "Viewer يقرأ فقط عبر SQL endpoints؛ القراءة عبر Lakehouse explorer تتطلب Contributor.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/workspace-roles-lakehouse",
  "images": [
   "/dp600/pages/p-086.png",
   "/dp600/pages/p-087.png",
   "/dp600/pages/p-088.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Group1=Viewer Group2=Contributor"
   },
   {
    "id": "oB",
    "text": "Group1=Admin Group2=Viewer"
   },
   {
    "id": "oC",
    "text": "كلاهما Contributor"
   },
   {
    "id": "oD",
    "text": "كلاهما Viewer"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q068",
  "number": 68,
  "category": "بيانات",
  "question": "OneLake security: المستخدم A (وصول كامل للبيانات) والمستخدم B (محلل قراءات محددة).",
  "explanation": "حسب المتطلبات: مسؤول = Read All، محلل قراءات محددة = Read Data (least privilege).",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-sharing",
  "images": [
   "/dp600/pages/p-089.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "A=Read All B=Read Data"
   },
   {
    "id": "oB",
    "text": "A=Read Data B=Read All"
   },
   {
    "id": "oC",
    "text": "كلاهما Read All"
   },
   {
    "id": "oD",
    "text": "كلاهما Read Data"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q069",
  "number": 69,
  "category": "بنية",
  "question": "تنسيق حفظ التقرير/النموذج كملفات نصية قابلة للإدارة عبر Git وAzure Pipelines؟",
  "explanation": ".pbip يحفظ التعريفات كملفات نصية في بنية مجلدات.",
  "reference": "https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-overview",
  "images": [
   "/dp600/pages/p-090.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "PBIP"
   },
   {
    "id": "oB",
    "text": "PBIDS"
   },
   {
    "id": "oC",
    "text": "PBIT"
   },
   {
    "id": "oD",
    "text": "PBIX"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q070",
  "number": 70,
  "category": "بيانات",
  "question": "وزّع الأنشطة على طبقات medallion (Bronze/Silver/Gold + التنسيق):",
  "explanation": "النسخ الخام = Copy، التحويل = Dataflow، التجميع = Stored Procedure، التنسيق = pipeline بجدولة.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-factory/activity-overview",
  "images": [
   "/dp600/pages/p-091.png"
  ],
  "type": "dragDrop",
  "options": [],
  "dropZones": [
   {
    "id": "z0",
    "label": "الفراغ 1"
   },
   {
    "id": "z1",
    "label": "الفراغ 2"
   },
   {
    "id": "z2",
    "label": "الفراغ 3"
   },
   {
    "id": "z3",
    "label": "الفراغ 4"
   }
  ],
  "dragItems": [
   {
    "id": "d0",
    "text": "Copy activity"
   },
   {
    "id": "d1",
    "text": "Dataflow activity"
   },
   {
    "id": "d2",
    "text": "Stored procedure activity"
   },
   {
    "id": "d3",
    "text": "Notebook"
   },
   {
    "id": "d4",
    "text": "pipeline بجدولة"
   },
   {
    "id": "d5",
    "text": "Spark job definition"
   },
   {
    "id": "d6",
    "text": "notebooks منفردة"
   },
   {
    "id": "d7",
    "text": "3 مواعيد منفصلة"
   }
  ],
  "dragCorrect": {
   "z0": "",
   "z1": "",
   "z2": "",
   "z3": ""
  }
 },
 {
  "id": "q071",
  "number": 71,
  "category": "بيانات",
  "question": "أكمل كود تحويل Age من string إلى integer مع إرجاع DataFrame كامل:",
  "explanation": "df.withColumn(\"age\", col(\"age\").cast(\"int\")).",
  "reference": "https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.DataFrame.withColumn.html",
  "images": [
   "/dp600/pages/p-092.png"
  ],
  "type": "dragDrop",
  "options": [],
  "dropZones": [
   {
    "id": "z0",
    "label": "الفراغ 1"
   },
   {
    "id": "z1",
    "label": "الفراغ 2"
   }
  ],
  "dragItems": [
   {
    "id": "d0",
    "text": "withColumn"
   },
   {
    "id": "d1",
    "text": "select"
   },
   {
    "id": "d2",
    "text": "filter"
   },
   {
    "id": "d3",
    "text": "cast"
   },
   {
    "id": "d4",
    "text": "\"int\""
   },
   {
    "id": "d5",
    "text": "\"string\""
   },
   {
    "id": "d6",
    "text": "\"long\""
   },
   {
    "id": "d7",
    "text": "\"double\""
   }
  ],
  "dragCorrect": {
   "z0": "",
   "z1": ""
  }
 },
 {
  "id": "q072",
  "number": 72,
  "category": "بيانات",
  "question": "أكمل كود تحميل parquet إلى Lakehouse ليظهر تلقائيًا كجدول Sales:",
  "explanation": "الكتابة بصيغة delta في Tables/Sales تجعلها Managed table تظهر تلقائيًا.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-tables",
  "images": [
   "/dp600/pages/p-093.png"
  ],
  "type": "dragDrop",
  "options": [],
  "dropZones": [
   {
    "id": "z0",
    "label": "الفراغ 1"
   },
   {
    "id": "z1",
    "label": "الفراغ 2"
   }
  ],
  "dragItems": [
   {
    "id": "d0",
    "text": "delta"
   },
   {
    "id": "d1",
    "text": "parquet"
   },
   {
    "id": "d2",
    "text": "csv"
   },
   {
    "id": "d3",
    "text": "json"
   },
   {
    "id": "d4",
    "text": "Tables/Sales"
   },
   {
    "id": "d5",
    "text": "Files/Sales"
   },
   {
    "id": "d6",
    "text": "Tables/sales-data"
   },
   {
    "id": "d7",
    "text": "Files/data"
   }
  ],
  "dragCorrect": {
   "z0": "",
   "z1": ""
  }
 },
 {
  "id": "q073",
  "number": 73,
  "category": "بيانات",
  "question": "نشاط pipeline يدعم تعبيرات Power Query M لتحميل CSV من Azure إلى Lakehouse؟",
  "explanation": "Dataflow (Gen2) هو الوحيد الذي يدعم لغة M.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-factory/dataflow-gen2-overview",
  "images": [
   "/dp600/pages/p-094.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Dataflow"
   },
   {
    "id": "oB",
    "text": "Notebook"
   },
   {
    "id": "oC",
    "text": "Script"
   },
   {
    "id": "oD",
    "text": "Copy data"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q074",
  "number": 74,
  "category": "بيانات",
  "question": "أكمل إعدادات الكتابة لإضافة بيانات بـ10 أعمدة لجدول Delta بـ8 مع الإبقاء على القديم:",
  "explanation": "append + mergeSchema=true يحافظ على القديم ويوسّع المخطط.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/table-tutorial",
  "images": [
   "/dp600/pages/p-094.png",
   "/dp600/pages/p-095.png"
  ],
  "type": "dragDrop",
  "options": [],
  "dropZones": [
   {
    "id": "z0",
    "label": "الفراغ 1"
   },
   {
    "id": "z1",
    "label": "الفراغ 2"
   }
  ],
  "dragItems": [
   {
    "id": "d0",
    "text": "\"append\""
   },
   {
    "id": "d1",
    "text": "\"overwrite\""
   },
   {
    "id": "d2",
    "text": "\"merge\""
   },
   {
    "id": "d3",
    "text": "\"rewrite\""
   },
   {
    "id": "d4",
    "text": "(\"mergeSchema\",\"true\")"
   },
   {
    "id": "d5",
    "text": "(\"append\",\"false\")"
   },
   {
    "id": "d6",
    "text": "(\"overwrite\",\"true\")"
   },
   {
    "id": "d7",
    "text": "(\"schemaMerge\",true)"
   }
  ],
  "dragCorrect": {
   "z0": "",
   "z1": ""
  }
 },
 {
  "id": "q075",
  "number": 75,
  "category": "بيانات",
  "question": "اختر دالتي T-SQL: لاستبدال NULL بقيمة بديلة، ولأخذ الأدنى بين عمودين:",
  "explanation": "COALESCE لاستبدال NULL وLEAST للأدنى.",
  "reference": "https://learn.microsoft.com/en-us/sql/t-sql/functions/least-transact-sql",
  "images": [
   "/dp600/pages/p-096.png"
  ],
  "type": "dragDrop",
  "options": [],
  "dropZones": [
   {
    "id": "z0",
    "label": "الفراغ 1"
   },
   {
    "id": "z1",
    "label": "الفراغ 2"
   }
  ],
  "dragItems": [
   {
    "id": "d0",
    "text": "COALESCE"
   },
   {
    "id": "d1",
    "text": "ISNULL"
   },
   {
    "id": "d2",
    "text": "GREATEST"
   },
   {
    "id": "d3",
    "text": "LEAST"
   },
   {
    "id": "d4",
    "text": "MIN"
   }
  ],
  "dragCorrect": {
   "z0": "",
   "z1": ""
  }
 },
 {
  "id": "q076",
  "number": 76,
  "category": "بيانات",
  "question": "نوع join يعيد كل صفوف الجدولين؟",
  "explanation": "Full outer join يعيد كل الصفوف من الجانبين.",
  "reference": "https://learn.microsoft.com/en-us/power-query/merge-queries-overview",
  "images": [
   "/dp600/pages/p-097.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "inner"
   },
   {
    "id": "oB",
    "text": "full outer"
   },
   {
    "id": "oC",
    "text": "left outer"
   },
   {
    "id": "oD",
    "text": "right anti"
   },
   {
    "id": "oE",
    "text": "right outer"
   },
   {
    "id": "oF",
    "text": "left anti"
   }
  ],
  "correctAnswers": [
   "oB"
  ]
 },
 {
  "id": "q077",
  "number": 77,
  "category": "بيانات",
  "question": "حذف ملفات Delta غير المرجعية آخر 30 يومًا مع بقاء ACID سليمًا. ماذا؟",
  "explanation": "VACUUM يحذف الملفات/السجلات غير المرجعية مع الحفاظ على ACID.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/delta-optimize-vacuum",
  "images": [
   "/dp600/pages/p-098.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "حذف من OneLake file explorer"
   },
   {
    "id": "oB",
    "text": "OPTIMIZE مع Z-order"
   },
   {
    "id": "oC",
    "text": "OPTIMIZE مع V-order"
   },
   {
    "id": "oD",
    "text": "VACUUM"
   }
  ],
  "correctAnswers": [
   "oD"
  ]
 },
 {
  "id": "q078",
  "number": 78,
  "category": "بيانات",
  "question": "اختر نوع SCD المناسب لكل جدول:",
  "explanation": "Type 2 لتتبع التاريخ الكامل، Type 1 للكتابة فوق.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-warehouse/slowly-changing-dimension",
  "images": [
   "/dp600/pages/p-098.png"
  ],
  "type": "dragDrop",
  "options": [],
  "dropZones": [
   {
    "id": "z0",
    "label": "الفراغ 1"
   },
   {
    "id": "z1",
    "label": "الفراغ 2"
   }
  ],
  "dragItems": [
   {
    "id": "d0",
    "text": "Type 2 (صفوف وتواريخ سريان)"
   },
   {
    "id": "d1",
    "text": "Type 1 (تحديث في المكان)"
   }
  ],
  "dragCorrect": {
   "z0": "",
   "z1": ""
  }
 },
 {
  "id": "q079",
  "number": 79,
  "category": "بيانات",
  "question": "dataflow يجري inner join مع تجاهل المسافات بأقل جهد. ماذا؟",
  "explanation": "Merge Fuzzy يطابق بأقل جهد ويتجاهل المسافات.",
  "reference": "https://learn.microsoft.com/en-us/power-query/merge-queries-fuzzy-match",
  "images": [
   "/dp600/pages/p-099.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Append مع fuzzy matching"
   },
   {
    "id": "oB",
    "text": "Merge مع fuzzy matching"
   },
   {
    "id": "oC",
    "text": "Append مع lookup table"
   },
   {
    "id": "oD",
    "text": "Merge مع lookup table"
   }
  ],
  "correctAnswers": [
   "oB"
  ]
 },
 {
  "id": "q080",
  "number": 80,
  "category": "بيانات",
  "question": "نسخ schema1.city إلى schema2 بأقل نسخ بيانات. أي عبارة؟",
  "explanation": "CLONE ينسخ الميتاداتا فقط (point-in-time) بدون نقل البيانات.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-warehouse/clone-table",
  "images": [
   "/dp600/pages/p-100.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "INSERT INTO schema2.city SELECT * FROM schema1.city"
   },
   {
    "id": "oB",
    "text": "SELECT * INTO schema2.city FROM schema1.city"
   },
   {
    "id": "oC",
    "text": "CREATE TABLE schema2.city AS CLONE OF schema1.city"
   },
   {
    "id": "oD",
    "text": "CREATE TABLE schema2.city AS SELECT * FROM schema1.city"
   }
  ],
  "correctAnswers": [
   "oC"
  ]
 },
 {
  "id": "q081",
  "number": 81,
  "category": "نماذج",
  "question": "منع إضافة الجداول الجديدة في Lakehouse تلقائيًا للنموذج الدلالي الافتراضي. أين الإعداد؟",
  "explanation": "إعدادات SQL analytics endpoint تتحكم بمزامنة النموذج الدلالي الافتراضي.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-warehouse/manage-semantic-model",
  "images": [
   "/dp600/pages/p-100.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "SQL analytics endpoint settings"
   },
   {
    "id": "oB",
    "text": "Semantic model settings"
   },
   {
    "id": "oC",
    "text": "Workspace settings"
   },
   {
    "id": "oD",
    "text": "Lakehouse settings"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q082",
  "number": 82,
  "category": "بيانات",
  "question": "أكمل T-SQL لإنشاء POSCustomers في Warehouse1 من Lakehouse1.dbo.Customer:",
  "explanation": "CREATE TABLE AS SELECT مع three-part name عبر مخازن.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-warehouse/create-table-as-select",
  "images": [
   "/dp600/pages/p-101.png",
   "/dp600/pages/p-102.png"
  ],
  "type": "dragDrop",
  "options": [],
  "dropZones": [
   {
    "id": "z0",
    "label": "الفراغ 1"
   },
   {
    "id": "z1",
    "label": "الفراغ 2"
   }
  ],
  "dragItems": [
   {
    "id": "d0",
    "text": "CREATE TABLE dbo.POSCustomers AS SELECT"
   },
   {
    "id": "d1",
    "text": "INSERT INTO dbo.POSCustomers SELECT"
   },
   {
    "id": "d2",
    "text": "SELECT * INTO"
   },
   {
    "id": "d3",
    "text": "MERGE"
   },
   {
    "id": "d4",
    "text": "FROM Lakehouse1.dbo.Customer"
   },
   {
    "id": "d5",
    "text": "FROM Warehouse1.dbo.Customer"
   },
   {
    "id": "d6",
    "text": "FROM dbo.Lakehouse1"
   },
   {
    "id": "d7",
    "text": "FROM Lakehouse1.dbo"
   }
  ],
  "dragCorrect": {
   "z0": "",
   "z1": ""
  }
 },
 {
  "id": "q083",
  "number": 83,
  "category": "بيانات",
  "question": "stored procedure يعيد قيمًا يجب أن تتوفر للأنشطة اللاحقة. أي نشاط؟",
  "explanation": "Lookup ينفذ الإجراء ويعيد JSON متاحًا للأنشطة اللاحقة.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-factory/lookup-activity",
  "images": [
   "/dp600/pages/p-103.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Switch"
   },
   {
    "id": "oB",
    "text": "Copy data"
   },
   {
    "id": "oC",
    "text": "Append variable"
   },
   {
    "id": "oD",
    "text": "Lookup activity"
   }
  ],
  "correctAnswers": [
   "oD"
  ]
 },
 {
  "id": "q084",
  "number": 84,
  "category": "بيانات",
  "question": "استعلام SQL يشير لجدولَين من lakehouse مختلفين دون نسخ إضافي. ماذا تستخدم؟",
  "explanation": "view عبر قواعد البيانات (cross-database view) يجمع الجدولين.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-warehouse/views",
  "images": [
   "/dp600/pages/p-103.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "shortcut"
   },
   {
    "id": "oB",
    "text": "dataflow"
   },
   {
    "id": "oC",
    "text": "view"
   },
   {
    "id": "oD",
    "text": "managed table"
   }
  ],
  "correctAnswers": [
   "oC"
  ]
 },
 {
  "id": "q085",
  "number": 85,
  "category": "بيانات",
  "question": "نشاطان متتابعان، فشل الأول يجب ألا يحجب الثاني. أي مسار شرطي؟",
  "explanation": "Upon Completion يشغّل الثاني سواء نجح الأول أم فشل.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-factory/pipeline-expressions",
  "images": [
   "/dp600/pages/p-104.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Upon Failure"
   },
   {
    "id": "oB",
    "text": "Upon Completion"
   },
   {
    "id": "oC",
    "text": "Upon Skip"
   }
  ],
  "correctAnswers": [
   "oB"
  ]
 },
 {
  "id": "q086",
  "number": 86,
  "category": "نماذج",
  "question": "تحديد أعمدة Surrogate Key بـSummarizeBy خاطئ بأقل جهد. ماذا تستخدم؟",
  "explanation": "BPA يمكّن قواعد برمجية على الخصائص.",
  "reference": "https://learn.microsoft.com/en-us/power-bi/guidance/bpa",
  "images": [
   "/dp600/pages/p-104.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "DAX Formatter"
   },
   {
    "id": "oB",
    "text": "Model explorer"
   },
   {
    "id": "oC",
    "text": "Model view"
   },
   {
    "id": "oD",
    "text": "Best Practice Analyzer (Tabular Editor)"
   }
  ],
  "correctAnswers": [
   "oD"
  ]
 },
 {
  "id": "q087",
  "number": 87,
  "category": "نماذج",
  "question": "رتّب الخطوات الخمس لعزل أبطأ استعلام DAX في تقرير:",
  "explanation": "الترتيب: التسجيل من PA ← الفرز ← النسخ إلى DAX Studio ← تفعيل timings وتشغيله ← قراءة Server timings.",
  "reference": "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-performance-analyzer",
  "images": [
   "/dp600/pages/p-104.png"
  ],
  "type": "dragDrop",
  "options": [],
  "dropZones": [
   {
    "id": "z0",
    "label": "الفراغ 1"
   },
   {
    "id": "z1",
    "label": "الفراغ 2"
   },
   {
    "id": "z2",
    "label": "الفراغ 3"
   },
   {
    "id": "z3",
    "label": "الفراغ 4"
   },
   {
    "id": "z4",
    "label": "الفراغ 5"
   }
  ],
  "dragItems": [
   {
    "id": "d0",
    "text": "التسجيل من Performance Analyzer"
   },
   {
    "id": "d1",
    "text": "فرز Duration الأطول لاستعلام DAX"
   },
   {
    "id": "d2",
    "text": "نسخ أول استعلام إلى DAX Studio"
   },
   {
    "id": "d3",
    "text": "تفعيل Query/Server timings وتشغيله"
   },
   {
    "id": "d4",
    "text": "قراءة تبويب Server timings"
   }
  ],
  "dragCorrect": {
   "z0": "",
   "z1": "",
   "z2": "",
   "z3": "",
   "z4": ""
  }
 },
 {
  "id": "q088",
  "number": 88,
  "category": "نماذج",
  "question": "تغييرات برمجية لكل أعمدة Key (إخفاء/Nullable/SummarizeBy/MDX/مفتاح). ماذا تستخدم؟",
  "explanation": "Tabular Editor + C# Script.",
  "reference": "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-tabular-editor",
  "images": [
   "/dp600/pages/p-105.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Power BI Desktop"
   },
   {
    "id": "oB",
    "text": "ALM Toolkit"
   },
   {
    "id": "oC",
    "text": "Tabular Editor"
   },
   {
    "id": "oD",
    "text": "DAX Studio"
   }
  ],
  "correctAnswers": [
   "oC"
  ]
 },
 {
  "id": "q089",
  "number": 89,
  "category": "نماذج",
  "question": "أكمل التعبير لإنشاء عنصر Calculation يحوّل السياق إلى Month-to-date:",
  "explanation": "CALCULATE(SELECTEDMEASURE(), DATESMTD(...)).",
  "reference": "https://learn.microsoft.com/en-us/power-bi/transform-model/calculation-groups",
  "images": [
   "/dp600/pages/p-106.png"
  ],
  "type": "dragDrop",
  "options": [],
  "dropZones": [
   {
    "id": "z0",
    "label": "الفراغ 1"
   },
   {
    "id": "z1",
    "label": "الفراغ 2"
   }
  ],
  "dragItems": [
   {
    "id": "d0",
    "text": "CALCULATE"
   },
   {
    "id": "d1",
    "text": "SUMX"
   },
   {
    "id": "d2",
    "text": "CALCULATETABLE"
   },
   {
    "id": "d3",
    "text": "FILTER"
   },
   {
    "id": "d4",
    "text": "SELECTEDMEASURE()"
   },
   {
    "id": "d5",
    "text": "[Total Sales]"
   },
   {
    "id": "d6",
    "text": "SELECTEDVALUE()"
   },
   {
    "id": "d7",
    "text": "CALCULATE()"
   }
  ],
  "dragCorrect": {
   "z0": "",
   "z1": ""
  }
 },
 {
  "id": "q090",
  "number": 90,
  "category": "نماذج",
  "question": "Performance analyzer: Orders By Date الأبطأ و\"Other\" الأطول. أكبر خفض للمدة؟",
  "explanation": "تقليل عدد المرئيات يقلل زمن انتظار المرئيات الأخرى (Other).",
  "reference": "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-performance-analyzer",
  "images": [
   "/dp600/pages/p-107.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Automatic page refresh"
   },
   {
    "id": "oB",
    "text": "تحسين DAX في DAX Studio"
   },
   {
    "id": "oC",
    "text": "تغيير نوع المرئي"
   },
   {
    "id": "oD",
    "text": "تقليل عدد المرئيات"
   }
  ],
  "correctAnswers": [
   "oD"
  ]
 },
 {
  "id": "q091",
  "number": 91,
  "category": "نماذج",
  "question": "ضمان بقاء استعلامات Direct Lake دائمًا في Direct Lake. ماذا تضبط؟",
  "explanation": "ضبط DirectLakeBehavior عبر TOM/TMSL يمنع التراجع إلى DirectQuery.",
  "reference": "https://learn.microsoft.com/en-us/fabric/fundamentals/direct-lake-develop",
  "images": [
   "/dp600/pages/p-108.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Model: Default Mode"
   },
   {
    "id": "oB",
    "text": "Partitions: Mode"
   },
   {
    "id": "oC",
    "text": "Model: Storage Location"
   },
   {
    "id": "oD",
    "text": "Model: Direct Lake Behavior = DirectLakeOnly"
   }
  ],
  "correctAnswers": [
   "oD"
  ]
 },
 {
  "id": "q092",
  "number": 92,
  "category": "نماذج",
  "question": "في أي حال يقلل استبدال FILTER بـKEEPFILTERS زمن التنفيذ؟",
  "explanation": "حسب وثائق Microsoft الرسمية: تعبيرات Boolean ذات قيود (لا measure ولا عدة جداول ولا CALCULATE متداخل) — الحالة الوحيدة الصالحة: عمود من جدول Import واحد. إجابة الملف (A) خاطئة.",
  "reference": "https://learn.microsoft.com/en-us/dax/best-practices/dax-avoid-avoid-filter-as-filter-argument",
  "images": [
   "/dp600/pages/p-109.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "FILTER داخل CALCULATE متداخل"
   },
   {
    "id": "oB",
    "text": "FILTER تشير إلى measure"
   },
   {
    "id": "oC",
    "text": "FILTER تشير لأعمدة من عدة جداول"
   },
   {
    "id": "oD",
    "text": "FILTER تشير لعمود من جدول Import واحد"
   }
  ],
  "correctAnswers": [
   "oD"
  ]
 },
 {
  "id": "q093",
  "number": 93,
  "category": "نماذج",
  "question": "RLS ديناميكي على HR مع بيانات ناقصة. طريقة التحقق المثلى؟",
  "explanation": "View as Role or Person يعرض التقرير كشخص محدد — الأنسب مع RLS ديناميكي.",
  "reference": "https://learn.microsoft.com/en-us/fabric/security/service-admin-row-level-security",
  "images": [
   "/dp600/pages/p-110.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "Test as role لعرض البيانات"
   },
   {
    "id": "oB",
    "text": "فلترة يدوية في التقرير"
   },
   {
    "id": "oC",
    "text": "Test as role لعرض التقرير كمدير HR محدد"
   },
   {
    "id": "oD",
    "text": "طلب فتح في Desktop"
   }
  ],
  "correctAnswers": [
   "oC"
  ]
 },
 {
  "id": "q094",
  "number": 94,
  "category": "بيانات",
  "question": "استكشاف نموذج جديد في Power Query — عرض Column profile (المعروض). أي خيارات تفعّل؟",
  "explanation": "حسب المعروض: Enable column profile + Show column quality details + Show column value distribution.",
  "reference": "https://learn.microsoft.com/en-us/power-query/data-profiling-tools",
  "images": [
   "/dp600/pages/p-110.png"
  ],
  "type": "multiple",
  "options": [
   {
    "id": "oA",
    "text": "Show column value distribution"
   },
   {
    "id": "oB",
    "text": "Enable details pane"
   },
   {
    "id": "oC",
    "text": "Enable column profile"
   },
   {
    "id": "oD",
    "text": "Show column quality details"
   },
   {
    "id": "oE",
    "text": "Show column profile in details pane"
   }
  ],
  "correctAnswers": [
   "oA",
   "oC",
   "oD"
  ]
 },
 {
  "id": "q095",
  "number": 95,
  "category": "بيانات",
  "question": "اختر دالتي T-SQL: للأكبر بين قيم، ولبديل NULL:",
  "explanation": "GREATEST للأكبر وCOALESCE لاستبدال NULL.",
  "reference": "https://learn.microsoft.com/en-us/sql/t-sql/functions/greatest-transact-sql",
  "images": [
   "/dp600/pages/p-111.png"
  ],
  "type": "dragDrop",
  "options": [],
  "dropZones": [
   {
    "id": "z0",
    "label": "الفراغ 1"
   },
   {
    "id": "z1",
    "label": "الفراغ 2"
   }
  ],
  "dragItems": [
   {
    "id": "d0",
    "text": "GREATEST"
   },
   {
    "id": "d1",
    "text": "LEAST"
   },
   {
    "id": "d2",
    "text": "COALESCE"
   },
   {
    "id": "d3",
    "text": "ISNULL"
   },
   {
    "id": "d4",
    "text": "MIN"
   }
  ],
  "dragCorrect": {
   "z0": "",
   "z1": ""
  }
 },
 {
  "id": "q096",
  "number": 96,
  "category": "تحليل",
  "question": "كود Python في مصنف Fabric يعرض عدّ قيم على شكل bar chart. نوع التحليلات؟",
  "explanation": "descriptive يصف ما حدث.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-science/data-science-overview",
  "images": [
   "/dp600/pages/p-112.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "descriptive"
   },
   {
    "id": "oB",
    "text": "diagnostic"
   },
   {
    "id": "oC",
    "text": "prescriptive"
   },
   {
    "id": "oD",
    "text": "predictive"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q097",
  "number": 97,
  "category": "بيانات",
  "question": "أكمل تقريب التاريخ إلى بداية الأسبوع:",
  "explanation": "DATETRUNC(datepart, date) يقرّب التاريخ وweekday بداية الأسبوع.",
  "reference": "https://learn.microsoft.com/en-us/sql/t-sql/functions/datetrunc-transact-sql",
  "images": [
   "/dp600/pages/p-113.png",
   "/dp600/pages/p-114.png",
   "/dp600/pages/p-115.png"
  ],
  "type": "dragDrop",
  "options": [],
  "dropZones": [
   {
    "id": "z0",
    "label": "الفراغ 1"
   },
   {
    "id": "z1",
    "label": "الفراغ 2"
   }
  ],
  "dragItems": [
   {
    "id": "d0",
    "text": "DATETRUNC"
   },
   {
    "id": "d1",
    "text": "DATEPART"
   },
   {
    "id": "d2",
    "text": "TRUNC"
   },
   {
    "id": "d3",
    "text": "FORMAT"
   },
   {
    "id": "d4",
    "text": "weekday"
   },
   {
    "id": "d5",
    "text": "day"
   },
   {
    "id": "d6",
    "text": "month"
   },
   {
    "id": "d7",
    "text": "isoweek"
   }
  ],
  "dragCorrect": {
   "z0": "",
   "z1": ""
  }
 },
 {
  "id": "q098",
  "number": 98,
  "category": "تحليل",
  "question": "تحويل وتصور مليار عنصر JSON لتحليل سلاسل زمنية (معالجة موازية، تقليل التكرار والزمن). أي اختيار؟",
  "explanation": "PySpark يعالج موزعًا بتوازٍ على المليارات من OneLake مباشرة.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/fabric-spark-how-to",
  "images": [
   "/dp600/pages/p-116.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "PySpark في مصنف Fabric"
   },
   {
    "id": "oB",
    "text": "pandas في مصنف Fabric"
   },
   {
    "id": "oC",
    "text": "تقرير Power BI بمرئيات أساسية"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 },
 {
  "id": "q099",
  "number": 99,
  "category": "تحليل",
  "question": "مخططات أعمدة لتوزيع عملاء محتفظ بهم مقابل مفقودين. نوع التحليلات؟",
  "explanation": "توزيع فعلي بلا تفسير أو تنبؤ — descriptive.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-science/data-science-overview",
  "images": [
   "/dp600/pages/p-116.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "diagnostic"
   },
   {
    "id": "oB",
    "text": "descriptive"
   },
   {
    "id": "oC",
    "text": "prescriptive"
   },
   {
    "id": "oD",
    "text": "predictive"
   }
  ],
  "correctAnswers": [
   "oB"
  ]
 },
 {
  "id": "q100",
  "number": 100,
  "category": "نماذج",
  "question": "أكمل DAX لاستخراج مبيعات نفس الفترة من العام السابق:",
  "explanation": "CALCULATE([Total Sales], SAMEPERIODLASTYEAR(...)).",
  "reference": "https://learn.microsoft.com/en-us/dax/sameperiodlastyear-function-dax",
  "images": [
   "/dp600/pages/p-117.png"
  ],
  "type": "dragDrop",
  "options": [],
  "dropZones": [
   {
    "id": "z0",
    "label": "الفراغ 1"
   },
   {
    "id": "z1",
    "label": "الفراغ 2"
   }
  ],
  "dragItems": [
   {
    "id": "d0",
    "text": "CALCULATE"
   },
   {
    "id": "d1",
    "text": "SELECT"
   },
   {
    "id": "d2",
    "text": "SUMMARIZE"
   },
   {
    "id": "d3",
    "text": "CALCULATETABLE"
   },
   {
    "id": "d4",
    "text": "SAMEPERIODLASTYEAR"
   },
   {
    "id": "d5",
    "text": "PARALLELPERIOD"
   },
   {
    "id": "d6",
    "text": "PREVIOUSYEAR"
   },
   {
    "id": "d7",
    "text": "DATEADD"
   }
  ],
  "dragCorrect": {
   "z0": "",
   "z1": ""
  }
 },
 {
  "id": "q101",
  "number": 101,
  "category": "بيانات",
  "question": "حدد صح أم خطأ (نعم/لا) لكل عبارة من العبارات التالية:",
  "explanation": "DESCRIBE DETAIL يعرض الحالة فقط — الصحيح HISTORY.",
  "reference": "https://learn.microsoft.com/en-us/fabric/data-engineering/delta-table-history",
  "images": [
   "/dp600/pages/p-118.png"
  ],
  "type": "yesNo",
  "statements": [
   {
    "id": "s0",
    "text": "هل يكشف DESCRIBE DETAIL customer تنفيذ مهام الصيانة؟",
    "correctAnswer": ""
   }
  ]
 },
 {
  "id": "q102",
  "number": 102,
  "category": "نماذج",
  "question": "استبدال CALCULATE(COUNTROWS('OrderItem'))>0 بـNOT ISEMPTY(CALCULATETABLE('OrderItem')). يقلل الزمن؟",
  "explanation": "تحليل SQLBI: ISEMPTY يتوقف عند أول صف فهو أسرع من count>0.",
  "reference": "https://www.sqlbi.com/articles/check-empty-table-condition-with-dax/",
  "images": [
   "/dp600/pages/p-119.png",
   "/dp600/pages/p-120.png"
  ],
  "type": "single",
  "options": [
   {
    "id": "oA",
    "text": "نعم"
   },
   {
    "id": "oB",
    "text": "لا"
   }
  ],
  "correctAnswers": [
   "oA"
  ]
 }
];
