import { Document, Page, Text, View } from '@react-pdf/renderer';
import { Table, TD, TR } from '@ag-media/react-pdf-table';
import { styles } from './invoice-styles';
import { Font } from '@react-pdf/renderer';
import cairoRegular from '@fontsource/cairo/files/cairo-arabic-400-normal.woff';
import cairoBold from '@fontsource/cairo/files/cairo-arabic-700-normal.woff';
import { formatDateTime } from '@/utils/formatDateTime';
import type { InvoiceData } from './utils/types';

Font.register({
  family: 'Cairo',
  fonts: [
    {
      src: cairoRegular,
      fontWeight: 'normal',
    },
    {
      src: cairoBold,
      fontWeight: 'bold',
    },
  ],
});

interface InvoiceDocumentProps {
  invoice: InvoiceData;
}

function InvoiceDocument({ invoice }: InvoiceDocumentProps) {
  const { date, time } = formatDateTime(invoice.createdAt);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, styles.textBold]}>ATHLO.</Text>
          </View>

          <View
            style={{
              gap: 2,
              alignItems: 'flex-end',
            }}
          >
            <View style={[styles.infoRow, { gap: 2 }]}>
              <Text style={styles.textBold}>INVOICE:</Text>
              <Text>{invoice.invoiceNumber}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.textBold}>DATE: </Text>
              <Text>
                {date} - {time}
              </Text>
            </View>

            {invoice.cashier && (
              <View style={styles.infoRow}>
                <Text style={styles.textBold}>Cashier:</Text>
                <Text>{invoice.cashier}</Text>
              </View>
            )}

            {invoice.paymentMethod && (
              <View style={styles.infoRow}>
                <Text style={styles.textBold}>Payment:</Text>
                <Text>{invoice.paymentMethod}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Customer Info */}
        {invoice.customer && (
          <View style={styles.spaceY}>
            <Text style={styles.billTo}>Bill To</Text>

            {(invoice.customer.name || invoice.customer.phone) && (
              <View style={[styles.infoRow, { gap: 30 }]}>
                <View style={styles.infoRow}>
                  <Text style={styles.textBold}>Name:</Text>

                  <Text style={styles.arabicText}>{invoice.customer.name}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.textBold}>Phone:</Text>

                  <Text>{invoice.customer.phone}</Text>
                </View>
              </View>
            )}

            {(invoice.customer.region || invoice.customer.city) && (
              <View style={styles.infoRow}>
                <Text style={styles.textBold}>Location:</Text>

                <Text style={styles.arabicText}>
                  {invoice.customer.region}, {invoice.customer.city}
                </Text>
              </View>
            )}

            {invoice.customer.address && (
              <View style={styles.infoRow}>
                <Text style={styles.textBold}>Address:</Text>

                <Text style={styles.arabicText}>
                  {invoice.customer.address}
                </Text>
              </View>
            )}

            <View style={styles.infoRow}>
              <View style={styles.infoRow}>
                <Text style={styles.textBold}>Building:</Text>

                <Text style={styles.arabicText}>
                  {invoice.customer.buildingNumber}
                </Text>
              </View>

              <Text style={[styles.textBold, styles.mutedText]}>|</Text>

              <View style={styles.infoRow}>
                <Text style={styles.textBold}>Floor:</Text>

                <Text style={styles.arabicText}>
                  {invoice.customer.floorNumber}
                </Text>
              </View>

              <Text style={[styles.textBold, styles.mutedText]}>|</Text>

              <View style={styles.infoRow}>
                <Text style={styles.textBold}>Apartment:</Text>

                <Text style={styles.arabicText}>
                  {invoice.customer.apartmentNumber}
                </Text>
              </View>
            </View>

            {invoice.customer.notes && (
              <View style={styles.infoRow}>
                <Text style={styles.textBold}>Notes:</Text>

                <Text style={styles.arabicText}>{invoice.customer.notes}</Text>
              </View>
            )}
          </View>
        )}

        {/* Table */}
        <Table style={styles.table}>
          {/* Header */}
          <TR style={styles.tableRow}>
            <TD style={[styles.th, { flex: 2.5 }]}>Product</TD>

            <TD style={[styles.th, styles.textCenter]}>Unit Price</TD>

            <TD style={[styles.th, styles.textCenter]}>Qty</TD>

            <TD style={[styles.th, styles.textCenter]}>Total</TD>
          </TR>

          {/* Rows */}
          {invoice.items.map((item: any, index: number) => (
            <TR key={index} style={styles.tableRow}>
              <TD style={[styles.td, { flex: 2.5 }]}>
                <View
                  style={{
                    flexDirection: 'column',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                    }}
                  >
                    {item.productName}
                  </Text>

                  {(item.attribute || item.color) && (
                    <Text
                      style={{
                        fontSize: 9,
                        color: '#6b7280',
                      }}
                    >
                      {[
                        item.attribute &&
                          `${item.attributeKey ? `${item.attributeKey}: ` : ''} ${item.attribute}`,
                        item.color && `Color: ${item.color}`,
                        item.unit && `Unit: ${item.unit}`,
                      ]
                        .filter(Boolean)
                        .join(' / ')}
                    </Text>
                  )}
                </View>
              </TD>

              <TD style={[styles.td, styles.textCenter]}>
                E£ {item.unitPrice.toLocaleString('en-GB')}
              </TD>

              <TD style={[styles.td, styles.textCenter]}>{item.quantity}</TD>

              <TD style={[styles.td, styles.textCenter]}>
                E£ {item.totalPrice.toLocaleString('en-GB')}
              </TD>
            </TR>
          ))}
        </Table>

        {/* Totals */}
        <View style={styles.totals}>
          <View style={{ width: 220 }}>
            <View style={styles.totalRow}>
              <Text>Subtotal:</Text>

              <Text>E£ {invoice.subtotal.toLocaleString('en-GB')}</Text>
            </View>

            <View style={styles.totalRow}>
              <Text>Tax (0%):</Text>

              <Text>E£ 0.00</Text>
            </View>

            {Boolean(invoice.discount && invoice.discount > 0) && (
              <View style={styles.totalRow}>
                <Text>Discount:</Text>

                <Text>E£ {invoice.discount!.toLocaleString('en-GB')}</Text>
              </View>
            )}

            <View style={[styles.totalRow, styles.finalTotal]}>
              <Text style={styles.textBold}>Total:</Text>

              <Text style={styles.textBold}>
                E£ {invoice.total.toLocaleString('en-GB')}
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Thank you for shopping with us!
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default InvoiceDocument;
