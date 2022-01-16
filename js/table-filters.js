const TABLE_TO_URI_MAP = {
  "abyss-table":
    "https://charts.mongodb.com/charts-project-0-bufgk/embed/charts?id=033af0b1-d082-4238-83be-3b1224b96c81&maxDataAge=3600&theme=light&autoRefresh=true&filter=",
  "domain-table":
    "https://charts.mongodb.com/charts-project-0-bufgk/embed/charts?id=4281f477-53cd-428c-b366-71eb74edd98a&amp;maxDataAge=3600&amp;theme=light&amp;autoRefresh=true",
  "event-table":
    "https://charts.mongodb.com/charts-project-0-bufgk/embed/charts?id=3dfb74bf-d908-4d69-90a6-764bd1ee7c5f&amp;maxDataAge=3600&amp;theme=light&amp;autoRefresh=true",
  "weekly-boss-table":
    "https://charts.mongodb.com/charts-project-0-bufgk/embed/charts?id=5952c1ae-0664-43d1-a818-e4a907acb6a2&amp;maxDataAge=3600&amp;theme=light&amp;autoRefresh=true",
  "world-boss-table":
    "https://charts.mongodb.com/charts-project-0-bufgk/embed/charts?id=6ef76005-c2ef-4264-bc68-011b2877e74c&amp;maxDataAge=3600&amp;theme=light&amp;autoRefresh=true",
};

const TABLE_TO_FILTERS = {
  "abyss-table": ["region-filter", "subcat1-filter", "subcat2-filter"],
  "domain-table": ["region-filter", "subcat2-filter"],
  "event-table": ["region-filter", "subcat1-filter"],
  "weekly-boss-table": ["region", "subcat2-filter"],
  "world-boss-table": ["region", "subcat2-filter"],
};

const FILTER_TO_KEY = {
  "region-filter": "Region",
  "subcat1-filter": "SubCat1",
  "subcat2-filter": "SubCat2",
};

function getTableFilters(id) {
  return TABLE_TO_FILTERS[id];
}

function getTableURI(id) {
  return TABLE_TO_URI_MAP[id];
}

function getFilterKey(name) {
  return FILTER_TO_KEY[name];
}

function setTableFilters(tableId) {
  const tableURI = getTableURI(tableId);
  const tableFilters = getTableFilters(tableId);

  const reducedFilters = _.reduce(
    tableFilters,
    (filterObj, filter) => {
      const thisFilterVal = $("#" + filter).val();
      return _.isEmpty(thisFilterVal)
        ? filterObj
        : _.assign({ [getFilterKey(filter)]: thisFilterVal }, filterObj);
    },
    {}
  );

  const stringifiedFilters = JSON.stringify(reducedFilters);
  const newSource = tableURI + stringifiedFilters;
  $("#" + tableId).attr("src", newSource);
}
