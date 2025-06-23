/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CheckboxItem, DSField, DataSource, DateItem, DynamicForm, HStack, MultiComboBoxItem, Object, PickTreeItem, RadioGroupItem, SelectItem, SliderItem, TextItem, TimeItem, Tree, TreeNode } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onUserIDChanged = function (form, item, value) {
    form.fetchData({ userID: value }, function (dsResponse, data, dsRequest) {
        var hasFavoriteColor = data != null && data.length >= 1 && !!data[0].hasFavoriteColor;
        form.getItem('favoriteColor').setDisabled(!hasFavoriteColor);
    });
};
let onHasFavoriteColorChanged = function (form, item, value) {
    form.getItem('favoriteColor').setDisabled(!value);
};
let onFavoriteVacationDestinationGetValueIcon = function (value) {
    return value;
};
let onFavoriteCuisinesGetValueIcon = function (value) {
    if (isc.isAn.Array(value))
        return null;
    return value;
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="clientOnlyUsersDS" title="clientOnlyUsersDS" clientOnly="true">
            <fields>
                <DSField name="id" type="integer" title="ID" hidden="true" primaryKey="true"/>
                <DSField name="name" title="Name"/>
            </fields>
            <cacheData>
                <Object id="1" name="Max"/>
                <Object id="2" name="Bethany"/>
                <Object id="3" name="Zach"/>
                <Object id="4" name="Francesca"/>
            </cacheData>
        </DataSource>

        <DataSource ID="clientOnlyUserFavoritesDS" title="clientOnlyUserFavoritesDS" clientOnly="true">
            <fields>
                <DSField name="id" type="integer" title="ID" hidden="true" primaryKey="true"/>
                <DSField name="userID" type="integer" title="User ID" foreignKey="clientOnlyUsersDS.id"/>
                <DSField name="favoriteAnimal" title="Favorite Animal"/>
                <DSField name="favoriteNumber" type="number" title="Favorite Integer (0 - 100)"/>
                <DSField name="hasFavoriteColor" type="boolean" title="Has a Favorite Color?"/>
                <DSField name="favoriteColor">
                    <valueMap>
                            <value>Red</value>
                            <value>Orange</value>
                            <value>Yellow</value>
                            <value>Green</value>
                            <value>Blue</value>
                            <value>Indigo</value>
                            <value>Violet</value>
                    </valueMap>
                </DSField>
                <DSField name="favoriteDate" type="date" title="Favorite Date"/>
                <DSField name="favoriteTime" type="time" title="Favorite Time"/>
                <DSField name="favoriteMusicGenres" title="Favorite Music Genres" multiple="true">
                    <valueMap>
                            <value>Alternative</value>
                            <value>Classical</value>
                            <value>Country</value>
                            <value>Folk</value>
                            <value>Hip Hop</value>
                            <value>Jazz</value>
                            <value>Pop</value>
                            <value>R&amp;B</value>
                            <value>Rock</value>
                            <value>World</value>
                            <value>Other</value>
                    </valueMap>
                </DSField>
                <DSField name="favoriteVacationDestination" title="Favorite Vacation Destination">
                    <valueMap AS="Australia" BR="Brazil" CA="Canada" CH="China" FR="France" GM="Germany" IN="India" ID="Indonesia" IT="Italy" JA="Japan" MX="Mexico" RS="Russia" KS="South Korea" SP="Spain" UK="United Kingdom" US="United States"/>
                </DSField>
                <DSField name="favoriteCuisines" title="Favorite Cuisines" multiple="true">
                    <valueMap US="American" AS="Australian" BR="Brazilian" UK="British" CA="Canadian" CH="Chinese" FR="French" GM="German" IN="Indian" ID="Indonesian" IT="Italian" JA="Japanese" KS="Korean" MX="Mexican" RS="Russian" SP="Spanish"/>
                </DSField>
                <DSField name="favoriteDepartment" title="Favorite Department"/>
            </fields>
            <cacheData>
                <Object id="1" userID="1" favoriteAnimal="Lemur" favoriteNumber="90" hasFavoriteColor="false" favoriteVacationDestination="JA" favoriteDepartment="4002">
                    <favoriteDate>2000-01-01</favoriteDate>
                    <favoriteTime>00:00:00.000</favoriteTime>
                    <favoriteMusicGenres>Classical</favoriteMusicGenres>
                    <favoriteMusicGenres>Rock</favoriteMusicGenres>
                    <favoriteMusicGenres>World</favoriteMusicGenres>
                    <favoriteCuisines>CA</favoriteCuisines>
                    <favoriteCuisines>CH</favoriteCuisines>
                    <favoriteCuisines>IN</favoriteCuisines>
                    <favoriteCuisines>RS</favoriteCuisines>
                </Object>
                <Object id="2" userID="2" favoriteAnimal="Zebra" favoriteNumber="12" hasFavoriteColor="true" favoriteColor="Orange" favoriteVacationDestination="US" favoriteDepartment="3002">
                    <favoriteDate>2012-12-12</favoriteDate>
                    <favoriteTime>12:12:00.000</favoriteTime>
                    <favoriteMusicGenres>Alternative</favoriteMusicGenres>
                    <favoriteMusicGenres>Hip Hop</favoriteMusicGenres>
                    <favoriteCuisines>US</favoriteCuisines>
                    <favoriteCuisines>AS</favoriteCuisines>
                    <favoriteCuisines>BR</favoriteCuisines>
                    <favoriteCuisines>UK</favoriteCuisines>
                </Object>
                <Object id="3" userID="3" favoriteAnimal="Elephant" favoriteNumber="10" hasFavoriteColor="true" favoriteColor="Green" favoriteVacationDestination="MX" favoriteDepartment="1001">
                    <favoriteDate>2010-10-10</favoriteDate>
                    <favoriteTime>10:10:00.000</favoriteTime>
                    <favoriteMusicGenres>Country</favoriteMusicGenres>
                    <favoriteMusicGenres>Folk</favoriteMusicGenres>
                    <favoriteCuisines>GM</favoriteCuisines>
                    <favoriteCuisines>ID</favoriteCuisines>
                    <favoriteCuisines>JA</favoriteCuisines>
                    <favoriteCuisines>MX</favoriteCuisines>
                </Object>
                <Object id="4" userID="4" favoriteAnimal="Blue Whale" favoriteNumber="55" hasFavoriteColor="true" favoriteColor="Blue" favoriteVacationDestination="SP" favoriteDepartment="3001">
                    <favoriteDate>2005-05-05</favoriteDate>
                    <favoriteTime>12:00:00.000</favoriteTime>
                    <favoriteMusicGenres>Pop</favoriteMusicGenres>
                    <favoriteMusicGenres>R&amp;B</favoriteMusicGenres>
                    <favoriteMusicGenres>Other</favoriteMusicGenres>
                    <favoriteCuisines>FR</favoriteCuisines>
                    <favoriteCuisines>IT</favoriteCuisines>
                    <favoriteCuisines>KS</favoriteCuisines>
                    <favoriteCuisines>SP</favoriteCuisines>
                </Object>
            </cacheData>
        </DataSource>

        <HStack width="100%">
            <members>
                <DynamicForm ID="favoritesForm" dataSource="clientOnlyUserFavoritesDS" colWidths="175,*" width="500" autoFetchData="true" autoDraw="false" revertValueKey="Escape">
                    <items>
                        <SelectItem optionDataSource="clientOnlyUsersDS" valueField="id" displayField="name" name="userID" title="User" changed={onUserIDChanged}/>
                        <TextItem name="favoriteAnimal" showPending="true"/>
                        <SliderItem minValue="0" maxValue="100" name="favoriteNumber" showPending="true"/>
                        <CheckboxItem name="hasFavoriteColor" showPending="true" changed={onHasFavoriteColorChanged}/>
                        <RadioGroupItem name="favoriteColor" disabled="true" showPending="true"/>
                        <DateItem name="favoriteDate" showPending="true"/>
                        <TimeItem name="favoriteTime" showPending="true"/>
                        <MultiComboBoxItem name="favoriteMusicGenres" useInsertionOrder="false" showPending="true"/>
                        <SelectItem name="favoriteVacationDestination" wrapTitle="false" imageURLPrefix="flags/24/" imageURLSuffix=".png" showPending="true" getValueIcon={onFavoriteVacationDestinationGetValueIcon}/>
                        <SelectItem name="favoriteCuisines" width="*" imageURLPrefix="flags/24/" imageURLSuffix=".png" showPending="true" showOldValueInHover="true" getValueIcon={onFavoriteCuisinesGetValueIcon}/>
                        <PickTreeItem valueField="id" name="favoriteDepartment" width="140" displayField="name" showPending="true">
                            <valueTree modelType="children">
                                <root name="root">
                                    <children>
                                        <TreeNode name="Marketing" id="1000">
                                            <children>
                                                <TreeNode name="Advertising" id="1001"/>
                                                <TreeNode name="Community Relations" id="1002"/>
                                            </children>
                                        </TreeNode>
                                        <TreeNode name="Sales" id="2000">
                                            <children>
                                                <TreeNode name="Channel Sales" id="2001"/>
                                                <TreeNode name="Direct Sales" id="2002"/>
                                            </children>
                                        </TreeNode>
                                        <TreeNode name="Manufacturing" id="3000">
                                            <children>
                                                <TreeNode name="Design" id="3001"/>
                                                <TreeNode name="Development" id="3002"/>
                                                <TreeNode name="QA" id="3003"/>
                                            </children>
                                        </TreeNode>
                                        <TreeNode name="Services" id="4000">
                                            <children>
                                                <TreeNode name="Support" id="4001"/>
                                                <TreeNode name="Consulting" id="4002"/>
                                            </children>
                                        </TreeNode>
                                    </children>
                                </root>
                            </valueTree>
                        </PickTreeItem>
                    </items>
                    <initialCriteria userID="1"/>
                </DynamicForm>
            </members>
        </HStack>
    </>,
    document.getElementById(target)
);
