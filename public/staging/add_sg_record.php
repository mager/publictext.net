<?php

/* Store the handle and topic in SimpleGeo Storage */
set_include_path(get_include_path() . PATH_SEPARATOR . '/home/amager/.pear/usr/local/php5/lib/pear/');
require_once '../Services_SimpleGeo/Services/SimpleGeo.php';

$client = new Services_SimpleGeo('ZL3NUaaTPF7DdvvsZpGD6wqvkBLWPDAs', 'MpCnGhagXDG7ppxQJvhupBRuewUmEHJh');
$record = new Services_SimpleGeo_Record('net.publictext.topics', $pageID, $lat, $lon);
$record->name = $topic;

try {
    $result = $client->addRecord($record);
    if ($result === true) {
        return;
    }
} catch (Services_SimpleGeo_Exception $e) { 
    echo "ERROR: " . $e->getMessage() . " (#" . $e->getCode() . ") ";
}

/* End SimpleGeo */
?>