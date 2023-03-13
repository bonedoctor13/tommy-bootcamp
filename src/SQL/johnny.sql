SQL> create table cereal_list(
select cereals.name, cereal_makers.brand
from cereals.csv
join cereal_makers.csv
on brand_id = cereal_makers.brand_id);